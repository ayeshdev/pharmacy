
SETUP PROJECT

Step 1: Install Composer
If you haven't installed Composer yet, visit getcomposer.org and follow the instructions for your operating system.

Step 2: Create a new Laravel Project
Open your terminal or command prompt and navigate to the directory where you want to create the Laravel project.

Run the following command:

composer create-project --prefer-dist laravel/laravel projectName
Replace projectName with the name you want to give your Laravel project. This command will create a new Laravel project using the latest stable release.

Step 3: Wait for Composer to Download Dependencies
Composer will now download all the necessary Laravel files and dependencies. This process might take some time depending on your internet speed.

Step 4: Access Your Laravel Project
Once the installation is complete, navigate to the projectName directory:


cd projectName
Step 5: Start Laravel Development Server
To see your Laravel project in action, you can start the Laravel development server. Run the following command within your project directory:


php artisan serve
This will start a development server at http://127.0.0.1:8000, and you can visit this URL in your web browser to see the default Laravel welcome page.


SETUP REACT WITH BREEZE

Step 1: Install Breeze
Begin by installing Laravel Breeze to set up the authentication scaffolding:

composer require laravel/breeze --dev

Step 2: Generate Breeze Authentication with React
Generate the authentication scaffolding using Breeze with React preset:

php artisan breeze:install --react

Step 3: Install NPM Dependencies
Install JavaScript dependencies required for React:

npm install

Step 4: Compile Assets
Compile the assets to include the React components:

npm run dev

Step 5: Run Migrations
Run the migrations to set up the authentication-related tables:

php artisan migrate --seed

Step 6: Start Laravel Server
Launch the Laravel development server:

php artisan serve

Step 7: Customize React Components
Breeze with React scaffolding generates React components inside the resources/js directory. You can customize these components according to your requirements.

Step 8: Integrate React Components
Integrate your React components into the appropriate Blade views or routes within your Laravel application.

Remember, Laravel Breeze with the React preset primarily sets up authentication using Laravel's backend with React frontend components. You can extend this further by integrating React components into other parts of your application or building additional functionality as needed.


SETTING UP MAILING CONFIGURATION

1. Mail Service Provider
In your .env file, set up the following configurations for your chosen mail service provider:

Mail Driver: Specify the driver Laravel will use to send mail. For instance, if you're using SMTP, set it as:

MAIL_MAILER=smtp
SMTP Settings: If you're using SMTP, configure your SMTP settings. For example:

MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_smtp_username
MAIL_PASSWORD=your_smtp_password
MAIL_ENCRYPTION=tls

Replace smtp.mailtrap.io, your_smtp_username, and your_smtp_password with the appropriate values provided by your SMTP service.

Other Mail Services: Laravel supports various mail drivers like Mailgun, SendGrid, etc. Adjust the configurations accordingly based on the chosen mail service provider.

SETTING UP DATABASE CONFIGURATIONS

1. Database Connection
Configure your database settings in the .env file:

Database Type: Specify the type of database you're using :

DB_CONNECTION=mysql

Database Host, Port, Name, Username, Password:

DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

Replace 127.0.0.1, 3306, your_database_name, your_database_username, and your_database_password with the appropriate values for your database.

Additional Considerations:

Ensure the provided credentials match your mail service provider and database setup.
Double-check the correctness of the configurations to avoid connection issues.
After making these changes in the .env file, save the file and restart your Laravel application to apply the new configurations. You can then test the mailing functionality by triggering a mail action in your application or run database-related commands (php artisan migrate for example) to ensure the database setup is functioning correctly.


ENDPOINTS

For Admin Login -> http://127.0.0.1:8000/admin-login
For Admin Dashboard -> http://127.0.0.1:8000/admin-dashboard

Admin Credintials ->
Email = a@gmail.com
Password = qwertyuiop

For User Registration -> http://127.0.0.1:8000/register
For User Login -> http://127.0.0.1:8000/
For User Dashbboard -> http://127.0.0.1:8000/dashboard
For User View Quotations -> http://127.0.0.1:8000/quotations



<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).


SETUP PROJECT

Step 1: Install Composer
If you haven't installed Composer yet, visit getcomposer.org and follow the instructions for your operating system.

Step 2: Create a new Laravel Project
Open your terminal or command prompt and navigate to the directory where you want to create the Laravel project.

Run the following command:

composer create-project --prefer-dist laravel/laravel projectName
Replace projectName with the name you want to give your Laravel project. This command will create a new Laravel project using the latest stable release.

Step 3: Wait for Composer to Download Dependencies
Composer will now download all the necessary Laravel files and dependencies. This process might take some time depending on your internet speed.

Step 4: Access Your Laravel Project
Once the installation is complete, navigate to the projectName directory:


cd projectName
Step 5: Start Laravel Development Server
To see your Laravel project in action, you can start the Laravel development server. Run the following command within your project directory:


php artisan serve
This will start a development server at http://127.0.0.1:8000, and you can visit this URL in your web browser to see the default Laravel welcome page.


SETUP REACT WITH BREEZE

Step 1: Install Breeze
Begin by installing Laravel Breeze to set up the authentication scaffolding:

composer require laravel/breeze --dev

Step 2: Generate Breeze Authentication with React
Generate the authentication scaffolding using Breeze with React preset:

php artisan breeze:install --react

Step 3: Install NPM Dependencies
Install JavaScript dependencies required for React:

npm install

Step 4: Compile Assets
Compile the assets to include the React components:

npm run dev

Step 5: Run Migrations
Run the migrations to set up the authentication-related tables:

php artisan migrate --seed

Step 6: Start Laravel Server
Launch the Laravel development server:

php artisan serve

Step 7: Customize React Components
Breeze with React scaffolding generates React components inside the resources/js directory. You can customize these components according to your requirements.

Step 8: Integrate React Components
Integrate your React components into the appropriate Blade views or routes within your Laravel application.

Remember, Laravel Breeze with the React preset primarily sets up authentication using Laravel's backend with React frontend components. You can extend this further by integrating React components into other parts of your application or building additional functionality as needed.


SETTING UP MAILING CONFIGURATION

1. Mail Service Provider
In your .env file, set up the following configurations for your chosen mail service provider:

Mail Driver: Specify the driver Laravel will use to send mail. For instance, if you're using SMTP, set it as:

MAIL_MAILER=smtp
SMTP Settings: If you're using SMTP, configure your SMTP settings. For example:

MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_smtp_username
MAIL_PASSWORD=your_smtp_password
MAIL_ENCRYPTION=tls

Replace smtp.mailtrap.io, your_smtp_username, and your_smtp_password with the appropriate values provided by your SMTP service.

Other Mail Services: Laravel supports various mail drivers like Mailgun, SendGrid, etc. Adjust the configurations accordingly based on the chosen mail service provider.

SETTING UP DATABASE CONFIGURATIONS

1. Database Connection
Configure your database settings in the .env file:

Database Type: Specify the type of database you're using :

DB_CONNECTION=mysql

Database Host, Port, Name, Username, Password:

DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password

Replace 127.0.0.1, 3306, your_database_name, your_database_username, and your_database_password with the appropriate values for your database.

Additional Considerations:

Ensure the provided credentials match your mail service provider and database setup.
Double-check the correctness of the configurations to avoid connection issues.
After making these changes in the .env file, save the file and restart your Laravel application to apply the new configurations. You can then test the mailing functionality by triggering a mail action in your application or run database-related commands (php artisan migrate for example) to ensure the database setup is functioning correctly.


ENDPOINTS

For Admin Login -> http://127.0.0.1:8000/admin-login
For Admin Dashboard -> http://127.0.0.1:8000/admin-dashboard

Admin Credintials ->
Email = a@gmail.com
Password = qwertyuiop

For User Registration -> http://127.0.0.1:8000/register
For User Login -> http://127.0.0.1:8000/
For User Dashbboard -> http://127.0.0.1:8000/dashboard
For User View Quotations -> http://127.0.0.1:8000/quotations
