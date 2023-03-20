<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\User;
use App\Services\FirebaseToken;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        //
        Auth::viaRequest('firebase', function (Request $request) {
            $token = $request->bearerToken();

            try {
                $payload = (new FirebaseToken($token))->verify(
                    config('services.firebase.project_id')
                );

                return User::find($payload->user_id);
            } catch (\Exception $e) {
                return null;
            }
        });
    }
}
