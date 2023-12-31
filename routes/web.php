<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuotationController;
use App\Models\DeliveryTime;
use App\Models\District;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {

    $timeSlots = DeliveryTime::all(); // Fetch time slots from your database
    $districts = District::all(); // Fetch districts from your database

    return Inertia::render('Dashboard', [
        'timeSlots' => $timeSlots,
        'districts' => $districts,
    ]);

})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/quotations', [ProfileController::class, 'quotations'])->name('profile.quotations');
    Route::post('/change-quotation-status',[QuotationController::class,'update'])->name('quotation.update');

    
});

Route::post('/add-prescription',[PrescriptionController::class, 'store'])->name('prescription.store');
Route::post('/add-images',[ImageController::class, 'store'])->name('images.store');

Route::get('/admin-dashboard',[AdminController::class,'index'])->middleware(['auth:admin', 'verified'])->name('admin.dashboard');
Route::get('/prescription/{id}',[PrescriptionController::class,'index'])->middleware(['auth:admin', 'verified'])->name('admin.getprecription');

Route::post('/add-quotation',[QuotationController::class,'store'])->middleware(['auth:admin', 'verified'])->name('quotation.store');

Route::post('/send-email-quotation',[QuotationController::class,'mail'])->middleware(['auth:admin', 'verified'])->name('quotation.store');
Route::post('/show-quotation',[QuotationController::class,'show'])->middleware(['auth:admin', 'verified'])->name('quotation.show');


require __DIR__.'/auth.php';
require __DIR__.'/adminauth.php';