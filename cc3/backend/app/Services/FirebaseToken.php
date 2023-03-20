<?php

namespace App\Services;

use Exception;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use UnexpectedValueException;

class FirebaseToken
{
    const ALLOWED_ALGOS = ['RS256'];
    const CACHE_KEY = '';
    const PUBLIC_KEY_URL = '';
    /**
     * Firebase ID token.
     *
     * @var string
     */
    private string $token;

    /**
     * @param string $token
     */
    public function __construct(string $token)
    {
        $this->token = $token;
    }

    /**
     * Verify the ID token and return the decoded payload.
     *
     * @param string $projectId
     * @return object
     * @throws UnexpectedValueException|Exception
     */
    public function verify(string $projectId): object
    {
        $keys = $this->getPublicKeys();

        $payload = JWT::decode($this->token, $keys, self::ALLOWED_ALGOS);

        $this->validatePayload($payload, $projectId);

        return $payload;
    }

    /**
     * Fetch JWT public keys.
     *
     * @return array
     * @throws Exception
     * @throws Exception
     */
    private function getPublicKeys(): array
    {
        if (Cache::has(self::CACHE_KEY)) {
            return Cache::get(self::CACHE_KEY);
        }

        $response = Http::get(self::PUBLIC_KEY_URL);

        if (!$response->successful()) {
            throw new Exception('Failed to fetch JWT public keys.');
        }

        $publicKeys = $response->json();
        $cacheControl = $response->header('Cache-Control');
        $maxAge = str()->of($cacheControl)->match('/max-age=(\d+)/');

        Cache::put(self::CACHE_KEY, $publicKeys, now()->addSeconds($maxAge));

        return $publicKeys;
    }

    /**
     * Validate decoded payload.
     *
     * @param object $payload
     * @param string $projectId Firebase project id
     * @return void
     * @throws UnexpectedValueException
     *
     * @see https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_a_third-party_jwt_library
     */
    private function validatePayload(object $payload, string $projectId): void
    {
        if ($payload->aud !== $projectId) {
            throw new UnexpectedValueException("Invalid audience: {$payload->aud}");
        }

        if ($payload->iss !== "https://securetoken.google.com/{$projectId}") {
            throw new UnexpectedValueException("Invalid issuer: {$payload->iss}");
        }

        // `sub` corresponds to the `uid` of the Firebase user.
        if (empty($payload->sub)) {
            throw new UnexpectedValueException('Payload subject is empty.');
        }
    }

}
