<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'note',
        'street_1',
        'street_2',
        'district_id',
        'delivery_time_id',
        'user_id',
        'prescription_id',
        'quotation_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function district(){
        return $this->belongsTo(District::class);
    }

    public function timeSlot(){
        return $this->belongsTo(DeliveryTime::class);
    }

    public function images(){
        return $this->hasMany(Image::class);
    }

    public function quotation(){
        return $this->hasOne(Quotation::class);
    }
}
