<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['is_active' => false],
            ['is_active' => true],
            // Add more default statuses if needed
        ];

        DB::table('statuses')->insert($statuses);
    }
}
