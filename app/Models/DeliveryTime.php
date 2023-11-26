<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryTime extends Model
{
    use HasFactory;

    protected $fillable = [
        'time_slot',
    ];

    public function prescription(){
        return $this->hasMany(Prescription::class);
    }
}
