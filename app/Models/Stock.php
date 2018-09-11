<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    // /**
    //  * The attributes that are mass assignable.
    //  *
    //  * @var array
    //  */
    // protected $fillable = [
    //     'name',
    // ];

    /**
     * Get the item that owns by stock.
     */
    public function item()
    {
        return $this->belongsTo('App\Models\Item');
    }
}
