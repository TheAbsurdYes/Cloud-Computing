<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    private Client $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => env('MY_WEB_SERVICE'),
            'timeout' => 5.0,
        ]);
    }

    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $response = $this->client->get('api/products');
        $products = json_decode($response->getBody()->getContents());

        return ProductResource::collection($products);

    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $response = $this->client->post('api/products', [
            'json' => $request->all()
        ]);

        $product = json_decode($response->getBody()->getContents());

        return new ProductResource($product);
    }

    /**
     * Display the specified product.
     */
    public function show($id): JsonResponse | ProductResource
    {

        try{

            $response = $this->client->get("api/products/$id");

        } catch (RequestException $requestException) {

            switch ($requestException->getCode()) {

                case 404:
                    return response()->json([
                        'error' => 'The product that you want to show was not found'
                    ], 404);

                default:
                    break;

            }

        }

        $product = json_decode($response->getBody()->getContents());

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse | ProductResource
    {

        try {

            $response = $this->client->put("api/products/{$id}", [
                'json' => $request->all()
            ]);

        } catch (RequestException $requestException) {

            switch ($requestException->getCode()) {

                case 404:
                    return response()->json([
                        'error' => 'The product that you want to update was not found'
                    ], 404);

                default:
                    break;

            }

        }

        $product = json_decode($response->getBody()->getContents());

        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        try {

            $this->client->delete("api/products/{$id}");

        } catch (RequestException $requestException) {

            switch ($requestException->getCode()) {
                case 404:
                    return response()->json([
                        'error' => 'The product that you want to delete was not found'
                    ], 404);
                default:
                    break;
            }

        }

        return response()->json([
            'response' => 'The product was deleted'
        ]);

    }

}
