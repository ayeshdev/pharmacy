<?php

namespace Database\Seeders;

use App\Models\DeliveryTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeliveryTimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $timeSlots = [
            '08:00 AM - 10:00 AM',
            '10:00 AM - 12:00 PM',
            '12:00 PM - 02:00 PM',
            '02:00 PM - 04:00 PM',
            '04:00 PM - 06:00 PM',
            '06:00 PM - 08:00 PM',
            '08:00 PM - 10:00 PM',
        ];

        foreach ($timeSlots as $slot) {
            DeliveryTime::create(['time_slot' => $slot]);
        }
    }
}
