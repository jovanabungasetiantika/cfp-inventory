<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionDetail extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'transaction_id',
        'item_id',
        'qty',
        'price',
        'unit',
        'total',
    ];

    /**
     * Get the item that owns by stock.
     */
    public function item()
    {
        return $this->belongsTo('App\Models\Item');
    }
}
