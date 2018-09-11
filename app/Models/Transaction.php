<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'number',
        'date',
        'remark',
        'type',
    ];

    /**
     * Get the detail that owns by transaction.
     */
    public function details()
    {
        return $this->hasMany('App\Models\TransactionDetail');
    }

    // public function totalDetail()
    // {
    //   return $this->details->count();
    // }
}
