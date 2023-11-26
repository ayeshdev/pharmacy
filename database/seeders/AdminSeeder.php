<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                // Create a default admin
                Admin::create([
                    'email' => 'a@gmail.com',
                    'password' => bcrypt('qwertyuiop'), // Encrypt the password
                    // Add other admin details as needed
                ]);
    }
}
