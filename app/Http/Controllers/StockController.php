<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Stock;
use Carbon\Carbon;
use ExcelReport;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $page = 1;
        $perPage = 10;
        if ($request->page) {
            $page = $request->page;
        }
        if ($request->perPage) {
            $perPage = $request->perPage;
        }
        $dateFirst = $request->dateFirst;
        $dateLast = $request->dateLast;
        
        $stock = Item::leftJoin('stocks', 'items.id', 'stocks.item_id')
            ->join('categories', 'items.category_id', 'categories.id')
            ->selectRaw('items.id,
                items.name,
                items.unit,
                categories.name as category,
                SUM(CASE WHEN stocks.date < ? THEN stocks.qty ELSE 0 END) as qty,
                MAX(CASE WHEN stocks.date < ? THEN stocks.price ELSE 0 END) as price,
                SUM(CASE WHEN stocks.qty > 0 AND stocks.date >= ? AND stocks.date <= ? THEN stocks.qty ELSE 0 END) as inQty,
                MAX(CASE WHEN stocks.qty > 0 AND stocks.date >= ? AND stocks.date <= ? THEN stocks.price ELSE 0 END) as inPrice,
                SUM(CASE WHEN stocks.qty < 0 AND stocks.date >= ? AND stocks.date <= ? THEN ABS(stocks.qty) ELSE 0 END) as outQty,
                MAX(CASE WHEN stocks.qty < 0 AND stocks.date >= ? AND stocks.date <= ? THEN stocks.price ELSE 0 END) as outPrice,
                stocks.price',
                [$dateFirst, $dateFirst, $dateFirst, $dateLast, $dateFirst, $dateLast, $dateFirst, $dateLast, $dateFirst, $dateLast]
            )
            ->groupBy('items.id',
                'items.name',
                'items.unit',
                'categories.name',
                'stocks.price'
            )
            ->distinct()
            ->paginate($perPage, ['*'], 'page', $page);
        return response()->json($stock, 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stockReport(Request $request)
    {
        $dateFirst = $request->dateFirst;
        $dateLast = $request->dateLast;
        $carbonFirstDate = Carbon::parse($dateFirst);
        $carbonLastDate = Carbon::parse($dateLast);
        $title = 'Stock Opname ' . $carbonFirstDate->format('dmY');
        $meta = [
            '' => 'BPJS Ketenagakerjaan',
            '' => 'Kantor Cabang Rengat',
            '' => 'Stock Opname Perlengakapan Kantor',
            '' => 'Cetak, ATK, Consumable',
            'PER ' => $carbonFirstDate->format('d F Y'),
        ];

        $queryBuilder = Item::leftJoin('stocks', 'items.id', 'stocks.item_id')
            ->join('categories', 'items.category_id', 'categories.id')
            ->selectRaw('items.id,
            items.name,
            items.unit,
            categories.name as category,
            SUM(CASE WHEN stocks.date < ? THEN stocks.qty ELSE 0 END) as qty,
            MAX(CASE WHEN stocks.date < ? THEN stocks.price ELSE 0 END) as price,
            SUM(CASE WHEN stocks.qty > 0 AND stocks.date >= ? AND stocks.date <= ? THEN stocks.qty ELSE 0 END) as inQty,
            MAX(CASE WHEN stocks.qty > 0 AND stocks.date >= ? AND stocks.date <= ? THEN stocks.price ELSE 0 END) as inPrice,
            SUM(CASE WHEN stocks.qty < 0 AND stocks.date >= ? AND stocks.date <= ? THEN ABS(stocks.qty) ELSE 0 END) as outQty,
            MAX(CASE WHEN stocks.qty < 0 AND stocks.date >= ? AND stocks.date <= ? THEN stocks.price ELSE 0 END) as outPrice,
            SUM(CASE WHEN stocks.date <= ? THEN stocks.qty ELSE 0 END) as finalQty,
            MAX(CASE WHEN stocks.date <= ? THEN stocks.price ELSE 0 END) as finalPrice,
            stocks.price',
                [$dateFirst, $dateFirst, $dateFirst, $dateLast, $dateFirst, $dateLast, $dateFirst, $dateLast, $dateFirst, $dateLast, $dateLast, $dateLast]
            )
            ->groupBy('items.id',
                'items.name',
                'items.unit',
                'categories.name',
                'stocks.price'
            )
            ->distinct();

        $fisikMasuk = 'Fisik ' . $carbonFirstDate->format('d F Y');
        $rupiahMasuk = 'Rupiah ' . $carbonFirstDate->format('d F Y');
        $fisikKeluar = 'Fisik ' . $carbonLastDate->format('d F Y');
        $rupiahKeluar = 'Rupiah ' . $carbonLastDate->format('d F Y');

        $columns = [
            'Jenis Barang' => 'name',
            'Satuan' => 'unit',
            'Category',
            $fisikMasuk => 'qty',
            $rupiahMasuk => function ($result) {
                return $result->qty * $result->price;
            },
            'Fisik (Masuk)' => 'inQty',
            'Harga Satuan (Masuk)' => 'inPrice',
            'Rupiah (Masuk)' => function ($result) {
                return $result->inQty * $result->inPrice;
            },
            'Fisik (Keluar)' => 'outQty',
            'Harga Satuan (Keluar)' => 'outPrice',
            'Rupiah (Keluar)' => function ($result) {
                return $result->outQty * $result->outPrice;
            },
            $fisikKeluar => 'finalQty',
            $rupiahKeluar => function ($result) {
                return $result->finalQty * $result->finalPrice;
            },
        ];

        ExcelReport::of($title, $meta, $queryBuilder, $columns)
            ->editColumns([
                $fisikMasuk,
                $rupiahMasuk,
                'Fisik (Masuk)',
                'Harga Satuan (Masuk)',
                'Rupiah (Masuk)',
                'Fisik (Keluar)',
                'Harga Satuan (Keluar)',
                'Rupiah (Keluar)',
                $fisikKeluar,
                $rupiahKeluar,
            ], [
                'class' => 'right',
            ])
            ->groupBy('Category') // Show total of value on specific group. Used with showTotal() enabled.
            ->showTotal([
                $fisikMasuk => 'point',
                $rupiahMasuk => 'point',
                'Fisik (Masuk)' => 'point',
                'Harga Satuan (Masuk)' => 'point',
                'Rupiah (Masuk)' => 'point',
                'Fisik (Keluar)' => 'point',
                'Harga Satuan (Keluar)' => 'point',
                'Rupiah (Keluar)' => 'point',
                $fisikKeluar => 'point',
                $rupiahKeluar => 'point',
            ])
            ->download($title);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stockReportDetail(Request $request)
    {
        $dateFirst = $request->dateFirst;
        $dateLast = $request->dateLast;
        $itemId = $request->id;
        $carbonFirstDate = Carbon::parse($dateFirst);
        $carbonLastDate = Carbon::parse($dateLast);
        $item = Item::where('id', $itemId)->first();
        $title = 'Kartu Stock';
        $meta = [
            'Kartu Stok:' => $item->name,
        ];

        $queryBuilder = Item::leftJoin('stocks', 'items.id', 'stocks.item_id')
            ->selectRaw('items.id,
            items.name,
            items.unit,
            stocks.number,
            stocks.date,
            CASE WHEN stocks.qty > 0 AND stocks.date >= ? AND stocks.date <= ? THEN stocks.qty ELSE 0 END as inQty,
            CASE WHEN stocks.qty < 0 AND stocks.date >= ? AND stocks.date <= ? THEN ABS(stocks.qty) ELSE 0 END as outQty,
            (
                SELECT SUM(cum.qty) FROM stocks as cum WHERE cum.date >= ? AND cum.date <= ? AND cum.id <= stocks.id AND cum.item_id = ?
            ) as finalQty',
                [$dateFirst, $dateLast, $dateFirst, $dateLast, $dateFirst, $dateLast, $itemId]
            )
            ->where('items.id', $itemId)
            ->orderBy('stocks.date', 'ASC')
            ->groupBy('items.id',
                'items.name',
                'items.unit',
                'stocks.id',
                'stocks.number',
                'stocks.qty',
                'stocks.date',
                'stocks.price'
            )
            ->distinct();

        $columns = [
            'Tanggal' => 'date',
            'Masuk' => 'inQty',
            'Keluar' => 'outQty',
            'Sisa' => 'finalQty',
        ];

        return ExcelReport::of($title, $meta, $queryBuilder, $columns)
            ->editColumns([
                'Masuk',
                'Keluar',
                'Sisa',
            ], [
                'class' => 'right',
            ])
            ->download($title . ' ' . $item->name);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function detail(Request $request)
    {
        $page = 1;
        $perPage = 10;
        if ($request->page) {
            $page = $request->page;
        }
        if ($request->perPage) {
            $perPage = $request->perPage;
        }
        $dateFirst = $request->dateFirst;
        $dateLast = $request->dateLast;
        $itemId = $request->id;
        $stock = Item::leftJoin('stocks', 'items.id', 'stocks.item_id')
            ->selectRaw('items.id,
                items.name,
                items.unit,
                stocks.number,
                stocks.date,
                CASE WHEN stocks.qty > 0 AND stocks.date >= ? AND stocks.date <= ? THEN stocks.qty ELSE 0 END as inQty,
                CASE WHEN stocks.qty < 0 AND stocks.date >= ? AND stocks.date <= ? THEN ABS(stocks.qty) ELSE 0 END as outQty,
                (
                    SELECT SUM(cum.qty) FROM stocks as cum WHERE cum.date >= ? AND cum.date <= ? AND cum.id <= stocks.id AND cum.item_id = ?
                ) as finalQty',
                [$dateFirst, $dateLast, $dateFirst, $dateLast, $dateFirst, $dateLast, $itemId]
            )
            ->where('items.id', $itemId)
            ->groupBy('items.id',
                'items.name',
                'items.unit',
                'stocks.id',
                'stocks.number',
                'stocks.qty',
                'stocks.date',
                'stocks.price'
            )
            ->distinct()
            ->paginate($perPage, ['*'], 'page', $page);
        return response()->json($stock, 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function lowStockIndex(Request $request)
    {
        $stock = Item::leftJoin('stocks', 'items.id', 'stocks.item_id')
            ->join('categories', 'items.category_id', 'categories.id')
            ->selectRaw('items.id,
                items.name,
                items.unit,
                categories.name as category,
                SUM(stocks.qty) as qty'
            )
            ->groupBy('items.id',
                'items.name',
                'items.unit',
                'categories.name'
            )
            ->orderByRaw('SUM(stocks.qty) ASC');
        $total = Item::count();
        return response()->json([
          'count' => $stock->havingRaw('SUM(stocks.qty) < 10')->get()->count(),
          'total' => $total,
          'data' => $stock->limit(10)->get(),
          'current_page' => 0,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function show(Stock $stock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function edit(Stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Stock $stock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Stock  $stock
     * @return \Illuminate\Http\Response
     */
    public function destroy(Stock $stock)
    {
        //
    }
}
