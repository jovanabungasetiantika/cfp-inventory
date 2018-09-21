<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Transaction;
use Carbon\Carbon;
use ExcelReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stockInIndex(Request $request)
    {
        $page = 1;
        $perPage = 10;
        if ($request->page) {
            $page = $request->page;
        }
        if ($request->perPage) {
            $perPage = $request->perPage;
        }
        return response()->json(Transaction::withCount('details')->where('type', 'in')->paginate($perPage, ['*'], 'page', $page), 200);
    }

    /**
     * Return total item.
     *
     * @return \Illuminate\Http\Response
     */
    public function stockCurrent(Request $request)
    {
        $stock = Stock::orderBy('date')
            ->select(DB::raw('SUM(stocks.qty) as qty'))
            ->where([
                ['item_id', '=', $request['item_id']],
                ['date', '<=', $request['date']],
            ])
            ->groupBy('item_id')
            ->first();
        return response()->json($stock, 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stockOutIndex(Request $request)
    {
        $page = 1;
        $perPage = 10;
        if ($request->page) {
            $page = $request->page;
        }
        if ($request->perPage) {
            $perPage = $request->perPage;
        }
        return response()->json(Transaction::withCount('details')->where('type', 'out')->paginate($perPage, ['*'], 'page', $page), 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stockInReportIndex(Request $request)
    {
        $dateFirst = $request->dateFirst;
        $dateLast = $request->dateLast;

        $page = 1;
        $perPage = 10;
        if ($request->page) {
            $page = $request->page;
        }
        if ($request->perPage) {
            $perPage = $request->perPage;
        }

        $transaction = Transaction::join('transaction_details', 'transactions.id', 'transaction_details.transaction_id')
            ->join('items', 'transaction_details.item_id', 'items.id')
            ->select('transactions.date',
                'items.name',
                'transaction_details.unit',
                'transaction_details.qty',
                'transaction_details.price',
                DB::raw('transaction_details.qty * transaction_details.price as total')
            )
            ->whereDate('transactions.date', '>=', $dateFirst)
            ->whereDate('transactions.date', '<=', $dateLast)
            ->where('transactions.type', 'in');
        return response()->json($transaction->paginate($perPage, ['*'], 'page', $page), 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stockInReport(Request $request)
    {
        $dateFirst = $request->dateFirst;
        $dateLast = $request->dateLast;
        $carbonFirstDate = Carbon::parse($dateFirst);
        $carbonLastDate = Carbon::parse($dateLast);
        
        $title = 'DAFTAR BARANG MASUK ' . $carbonFirstDate->format('d F Y') . ' - ' . $carbonLastDate->format('d F Y');

        $meta = [];

        $queryBuilder = Transaction::join('transaction_details', 'transactions.id', 'transaction_details.transaction_id')
            ->join('items', 'transaction_details.item_id', 'items.id')
            ->join('categories', 'items.category_id', 'categories.id')
            ->select('transactions.date',
                'items.name',
                'categories.name as category',
                'transaction_details.unit',
                'transaction_details.qty',
                'transaction_details.price',
                DB::raw('transaction_details.qty * transaction_details.price as total')
            )
            ->whereDate('transactions.date', '>=', $dateFirst)
            ->whereDate('transactions.date', '<=', $dateLast)
            ->where('transactions.type', 'in');

        $columns = [
            'Tanggal' => 'date',
            'Jenis Barang' => 'name',
            'Satuan' => 'unit',
            'Category',
            'Quantity' => 'qty',
            'Harga Satuan' => 'price',
            'Jumlah' => 'total',
        ];

        ExcelReport::of($title, $meta, $queryBuilder, $columns)
            ->editColumns([
                'Quantity',
                'Harga Satuan',
                'Jumlah',
            ], [
                'class' => 'right',
            ])
            ->groupBy('Category') // Show total of value on specific group. Used with showTotal() enabled.
            ->showTotal([
              'Quantity' => 'point',
              'Jumlah' => 'point',
            ])
            ->download($title);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stockOutReportIndex(Request $request)
    {
        $dateFirst = $request->dateFirst;
        $dateLast = $request->dateLast;

        $page = 1;
        $perPage = 10;
        if ($request->page) {
            $page = $request->page;
        }
        if ($request->perPage) {
            $perPage = $request->perPage;
        }

        $transaction = Transaction::join('transaction_details', 'transactions.id', 'transaction_details.transaction_id')
            ->join('items', 'transaction_details.item_id', 'items.id')
            ->select('transactions.date',
                'items.name',
                'transaction_details.unit',
                'transaction_details.qty',
                'transaction_details.price',
                DB::raw('transaction_details.qty * transaction_details.price as total')
            )
            ->whereDate('transactions.date', '>=', $dateFirst)
            ->whereDate('transactions.date', '<=', $dateLast)
            ->where('transactions.type', 'out');
        return response()->json($transaction->paginate($perPage, ['*'], 'page', $page), 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stockOutReport(Request $request)
    {
        $dateFirst = $request->dateFirst;
        $dateLast = $request->dateLast;
        $carbonFirstDate = Carbon::parse($dateFirst);
        $carbonLastDate = Carbon::parse($dateLast);
        
        $title = 'DAFTAR BARANG KELUAR ' . $carbonFirstDate->format('d F Y') . ' - ' . $carbonLastDate->format('d F Y');

        $meta = [];

        $queryBuilder = Transaction::join('transaction_details', 'transactions.id', 'transaction_details.transaction_id')
            ->join('items', 'transaction_details.item_id', 'items.id')
            ->join('categories', 'items.category_id', 'categories.id')
            ->select('transactions.date',
                'items.name',
                'categories.name as category',
                'transaction_details.unit',
                'transaction_details.qty'
            )
            ->whereDate('transactions.date', '>=', $dateFirst)
            ->whereDate('transactions.date', '<=', $dateLast)
            ->where('transactions.type', 'out');

        $columns = [
            'Tanggal' => 'date',
            'Jenis Barang' => 'name',
            'Satuan' => 'unit',
            'Category',
            'Quantity' => 'qty',
        ];

        ExcelReport::of($title, $meta, $queryBuilder, $columns)
            ->editColumns([
                'Quantity',
            ], [
                'class' => 'right',
            ])
            ->groupBy('Category') // Show total of value on specific group. Used with showTotal() enabled.
            ->showTotal([
              'Quantity' => 'point',
            ])
            ->download($title);
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function stockInStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'number' => 'required|unique:transactions,number',
            'remark' => 'string|nullable',
            'date' => 'required|date',
            'details.*.item_id' => 'required|exists:items,id',
            'details.*.qty' => 'required|numeric',
            'details.*.price' => 'required|numeric',
            'details.*.unit' => 'required',
            'details.*.total' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        DB::transaction(function () use ($request) {
            $transaction = new Transaction;
            $transaction->number = $request->number;
            $transaction->remark = $request->remark;
            $transaction->date = $request->date;
            $transaction->type = 'in';
            $transaction->save();

            $details = $request->details;
            foreach ($details as $detail) {
                $stock = new Stock;
                $stock->number = $request->number;
                $stock->date = $request->date;
                $stock->item_id = $detail['item_id'];
                $stock->qty = $detail['qty'];
                $stock->price = $detail['price'];
                $stock->unit = $detail['unit'];
                $stock->total = $detail['total'];
                $stock->save();
            }

            $transaction->details()->createMany($request->details);
            return response()->json($transaction, 201);
        });
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function stockOutStore(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'number' => 'required|unique:transactions,number',
            'remark' => 'string|nullable',
            'date' => 'required|date',
            'details.*.item_id' => 'required|exists:items,id',
            'details.*.qty' => 'required|numeric',
            // 'details.*.unit' => 'required',
            // 'details.*.price' => 'required|numeric',
            // 'details.*.total' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        DB::transaction(function () use ($request) {
            $transaction = new Transaction;
            $transaction->number = $request->number;
            $transaction->remark = $request->remark;
            $transaction->date = $request->date;
            $transaction->type = 'out';
            $transaction->save();

            $details = $request->details;
            foreach ($details as $detail) {
                $stock = Stock::orderBy('date')
                    ->select(DB::raw('SUM(stocks.qty) as qty'))
                    ->where([
                        ['item_id', '=', $detail['item_id']],
                        ['date', '<=', $request->date],
                    ])
                    ->groupBy('item_id')
                    ->first();
                $qty = $detail['qty'];
                if ($stock->qty < $qty) {
                    return response()->json('Stock not enough.', 400);
                }
                $oldTrc = Stock::join('items', 'items.id', 'stocks.item_id')
                    ->orderBy('items.name', 'stocks.date')
                    ->select('stocks.item_id', DB::raw('SUM(stocks.qty) as qty'), 'stocks.unit', 'stocks.price')
                    ->where([
                        ['stocks.item_id', '=', $detail['item_id']],
                        ['date', '<=', $request->date],
                    ])
                    ->groupBy('stocks.item_id', 'stocks.price', 'stocks.unit')
                    ->get();
                foreach ($oldTrc as $trc) {
                    $stock = new Stock;
                    if ($trc->qty < $qty) {
                        $qty = $qty - $trc->qty;
                        $stock->qty = $trc->qty * -1;
                        $stock->total = $trc->qty * $trc->price * -1;
                    } else {
                        $stock->qty = $qty * -1;
                        $stock->total = $qty * $trc->price * -1;
                        $qty = 0;
                    }
                    $stock->number = $request->number;
                    $stock->date = $request->date;
                    $stock->item_id = $detail['item_id'];
                    $stock->price = $trc->price;
                    $stock->unit = $detail['unit'];
                    $stock->save();
                    if ($qty <= 0) {
                        break;
                    }
                }
            }

            $transaction->details()->createMany($request->details);
            return response()->json($transaction, 201);
        });
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function stockInShow(Transaction $transaction)
    {
        $id = $transaction->id;
        $trans = $transaction->with('details.item')->where([
            ['type', 'in'],
            ['id', $id],
        ])->first();
        return response()->json($trans, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function stockOutShow(Transaction $transaction)
    {
      $id = $transaction->id;
        $trans = $transaction->with('details.item')->where([
            ['type', 'out'],
            ['id', $id],
        ])->first();
        return response()->json($trans, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function stockInUpdate(Request $request, Transaction $transaction)
    {
        if ($transaction->number == $request->number) {
            unset($request['number']);
        }
        $validator = Validator::make($request->all(), [
            'number' => 'sometimes|required|unique:transactions,number',
            'date' => 'required|date',
            'remark' => 'string|nullable',
            'details.*.item_id' => 'required|exists:items,id',
            'details.*.qty' => 'required|numeric',
            'details.*.price' => 'required|numeric',
            'details.*.unit' => 'required',
            'details.*.total' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        DB::transaction(function () use ($request, $transaction) {
            $stock = Stock::where('number', $transaction->number);
            $stock->delete();
            if ($request->number) {
                $transaction->number = $request->number;
            }
            $transaction->remark = $request->remark;
            $transaction->date = $request->date;
            $transaction->save();

            $details = $request->details;
            foreach ($details as $detail) {
                $stock = new Stock;
                $stock->number = $transaction->number;
                $stock->date = $request->date;
                $stock->item_id = $detail['item_id'];
                $stock->qty = $detail['qty'];
                $stock->price = $detail['price'];
                $stock->unit = $detail['unit'];
                $stock->total = $detail['total'];
                $stock->save();
            }

            $transaction->details()->delete();
            $transaction->details()->createMany($request->details);

            return response()->json($transaction, 200);
        });
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function stockOutUpdate(Request $request, Transaction $transaction)
    {
        if ($transaction->number == $request->number) {
            unset($request['number']);
        }
        $validator = Validator::make($request->all(), [
            'number' => 'sometimes|required|unique:transactions,number',
            'date' => 'required|date',
            'remark' => 'string|nullable',
            'details.*.item_id' => 'required|exists:items,id',
            'details.*.qty' => 'required|numeric',
            'details.*.price' => 'required|numeric',
            'details.*.unit' => 'required',
            'details.*.total' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
        DB::transaction(function () use ($request, $transaction) {
            $stock = Stock::where('number', $transaction->number);
            $stock->delete();
            if ($request->number) {
                $transaction->number = $request->number;
            }
            $transaction->remark = $request->remark;
            $transaction->date = $request->date;
            $transaction->save();
            $transaction->details()->delete();

            $details = $request->details;
            foreach ($details as $detail) {
                $stock = Stock::orderBy('date')
                    ->select(DB::raw('SUM(stocks.qty) as qty'))
                    ->where('item_id', '=', $detail['item_id'])
                    ->groupBy('item_id')
                    ->first();
                $qty = $detail['qty'];
                if ($stock->qty < $qty) {
                    return response()->json('Stock not enough.', 400);
                }
                $oldTrc = Stock::join('items', 'items.id', 'stocks.item_id')
                    ->orderBy('items.name', 'stocks.date')
                    ->select('stocks.item_id', DB::raw('SUM(stocks.qty) as qty'), 'stocks.unit', 'stocks.price')
                    ->where([
                        ['stocks.item_id', '=', $detail['item_id']],
                    ])
                    ->groupBy('stocks.item_id', 'stocks.price', 'stocks.unit')
                    ->get();
                foreach ($oldTrc as $trc) {
                    $stock = new Stock;
                    if ($trc['qty'] < $qty) {
                        $qty = $qty - $trc['qty'];
                        $stock->qty = $trc['qty'] * -1;
                        $stock->total = $trc['qty'] * $detail['price'] * -1;
                    } else {
                        $stock->qty = $qty * -1;
                        $stock->total = $qty * $detail['price'] * -1;
                        $qty = 0;
                    }
                    $stock->number = $transaction->number;
                    $stock->date = $request->date;
                    $stock->item_id = $detail['item_id'];
                    $stock->price = $trc['price'];
                    $stock->unit = $detail['unit'];
                    $stock->save();
                    if ($qty <= 0) {
                        break;
                    }
                }
            }

            $transaction->details()->createMany($request->details);

            return response()->json($transaction, 200);
        });
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transaction $transaction)
    {
        DB::transaction(function () use ($transaction) {
            Stock::where('number', $transaction->number)->delete();
            $transaction->details()->delete();
            $transaction->delete();
            return response()->json([
                'message' => 'Data has been deleted successfully',
            ], 200);
        });
    }
}
