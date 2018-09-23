<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware('auth:api')->group(function () {
    Route::get('/user/self', 'UserController@details');

    Route::patch('/user/{user}', 'UserController@update');

    Route::post('/change-password', 'UserController@changePassword');

    Route::get('/logout', 'UserController@logout');

    Route::prefix('category')->group(function () {
        Route::get('/', 'CategoryController@index');

        Route::post('/', 'CategoryController@store');

        Route::get('/all', 'CategoryController@getAll');

        Route::get('/{category}', 'CategoryController@show');

        Route::patch('/{category}', 'CategoryController@update');

        Route::delete('/{category}', 'CategoryController@destroy');

    });

    Route::prefix('item')->group(function () {
        Route::get('/', 'ItemController@index');

        Route::post('/', 'ItemController@store');

        Route::get('/all', 'ItemController@getAll');

        Route::get('/{item}', 'ItemController@show');

        Route::patch('/{item}', 'ItemController@update');

        Route::delete('/{item}', 'ItemController@destroy');
    });

    Route::prefix('stock-in')->group(function () {
        Route::get('/', 'TransactionController@stockInIndex');

        Route::post('/', 'TransactionController@stockInStore');

        Route::post('/report-index', 'TransactionController@stockInReportIndex');

        Route::post('/report', 'TransactionController@stockInReport');

        Route::get('/{transaction}', 'TransactionController@stockInShow');

        Route::patch('/{transaction}', 'TransactionController@stockInUpdate');

        Route::delete('/{transaction}', 'TransactionController@destroy');
    });

    Route::prefix('stock-out')->group(function () {
        Route::get('/', 'TransactionController@stockOutIndex');

        Route::post('/', 'TransactionController@stockOutStore');

        Route::post('/report-index', 'TransactionController@stockOutReportIndex');

        Route::post('/report', 'TransactionController@stockOutReport');

        Route::get('/{transaction}', 'TransactionController@stockOutShow');

        Route::patch('/{transaction}', 'TransactionController@stockOutUpdate');

        Route::delete('/{transaction}', 'TransactionController@destroy');
    });

    Route::prefix('stock')->group(function () {
        Route::post('/', 'StockController@index');

        Route::post('/report', 'StockController@stockReport');

        Route::get('/low', 'StockController@lowStockIndex');
        // Route::post('/', 'TransactionController@stockOutStore');

        // Route::get('/{transaction}', 'TransactionController@stockOutShow');

        // Route::patch('/{transaction}', 'TransactionController@stockOutUpdate');

        // Route::delete('/{transaction}', 'TransactionController@destroy');
    });

    Route::prefix('stock-detail')->group(function () {
        Route::post('/', 'StockController@detail');

        Route::post('/report', 'StockController@stockReportDetail');
    });

    Route::prefix('stock-card')->group(function () {
      // Route::post('/', 'StockController@detail');

      Route::post('/report', 'StockController@stockReportDetailAll');
  });

    Route::prefix('period')->group(function () {
        Route::get('/', 'PeriodController@index');

        Route::post('/close', 'PeriodController@close');

        Route::post('/open', 'PeriodController@open');

        // Route::post('/', 'PeriodController@store');

        // Route::get('/{period}', 'PeriodController@show');

        // Route::patch('/{period}', 'PeriodController@update');

        // Route::delete('/{period}', 'PeriodController@destroy');
    });
});

Route::post('/login', 'UserController@login');

Route::post('/register', 'UserController@register');
