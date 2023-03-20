<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {

        return [
            'id' =>$this->when(isset($this->id), fn() => $this->id),
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'image' => fake()->imageUrl,
        ];
    }
}
