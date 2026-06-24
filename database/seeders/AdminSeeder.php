<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@siibmn.ac.id'],
            [
                'name'     => 'Administrator SIIBMN',
                'email'    => 'admin@siibmn.ac.id',
                'password' => Hash::make('admin123'),
            ]
        );
    }
}