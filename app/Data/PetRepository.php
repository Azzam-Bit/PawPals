<?php

declare(strict_types=1);

namespace App\Data;

/**
 * Sumber kebenaran tunggal untuk data hewan.
 *
 * Saat ini membaca dari array statis. Ketika backend dibangun, isi method
 * di bawah diganti dengan query database — pemanggilnya tidak perlu berubah.
 */
final class PetRepository
{
    /** @var array<int, array<string, mixed>>|null */
    private static ?array $pets = null;

    /** @return array<int, array<string, mixed>> */
    public static function all(): array
    {
        return self::load();
    }

    /** @return array<int, array<string, mixed>> */
    public static function featured(): array
    {
        return array_values(array_filter(
            self::load(),
            static fn (array $pet): bool => $pet['featured'] === true
        ));
    }

    /** @return array<string, mixed>|null */
    public static function find(int|string $id): ?array
    {
        foreach (self::load() as $pet) {
            if ((string) $pet['id'] === (string) $id) {
                return $pet;
            }
        }

        return null;
    }

    /**
     * Daftar jenis hewan unik, mengikuti urutan kemunculan pada data.
     * Dipakai untuk membangun tombol filter pencarian.
     *
     * @return array<int, array{slug: string, label: string, emoji: string}>
     */
    public static function types(): array
    {
        $types = [];

        foreach (self::load() as $pet) {
            $slug = $pet['type'];
            if (!isset($types[$slug])) {
                $types[$slug] = [
                    'slug' => $slug,
                    'label' => mb_strtoupper(mb_substr($slug, 0, 1)) . mb_substr($slug, 1),
                    'emoji' => $pet['image'],
                ];
            }
        }

        return array_values($types);
    }

    /** @return array<int, array<string, mixed>> */
    private static function load(): array
    {
        if (self::$pets !== null) {
            return self::$pets;
        }

        return self::$pets = [
            ['id' => 1, 'name' => 'Milo', 'type' => 'anjing', 'age' => '2 tahun', 'gender' => 'Jantan', 'description' => 'Milo adalah anjing yang ramah dan suka bermain. Cocok untuk keluarga aktif.', 'image' => '🐕', 'featured' => true],
            ['id' => 2, 'name' => 'Luna', 'type' => 'kucing', 'age' => '1 tahun', 'gender' => 'Betina', 'description' => 'Luna manja dan suka dipeluk. Sangat cocok untuk rumah yang tenang.', 'image' => '🐈', 'featured' => true],
            ['id' => 3, 'name' => 'Coco', 'type' => 'kelinci', 'age' => '6 bulan', 'gender' => 'Betina', 'description' => 'Coco lucu dan energik. Suka makan wortel dan bermain di rumput.', 'image' => '🐇', 'featured' => true],
            ['id' => 4, 'name' => 'Bella', 'type' => 'anjing', 'age' => '3 tahun', 'gender' => 'Betina', 'description' => 'Bella setia dan protektif. Sangat cocok untuk keluarga dengan anak.', 'image' => '🐕', 'featured' => true],
            ['id' => 5, 'name' => 'Max', 'type' => 'kucing', 'age' => '4 tahun', 'gender' => 'Jantan', 'description' => 'Max adalah kucing yang kalem dan mandiri. Suka tidur di tempat tinggi.', 'image' => '🐈', 'featured' => false],
            ['id' => 6, 'name' => 'Chloe', 'type' => 'hamster', 'age' => '8 bulan', 'gender' => 'Betina', 'description' => 'Chloe mungil dan lincah. Sangat mudah dirawat, cocok untuk pemula.', 'image' => '🐹', 'featured' => false],
            ['id' => 7, 'name' => 'Charlie', 'type' => 'burung', 'age' => '1,5 tahun', 'gender' => 'Jantan', 'description' => 'Charlie pandai meniru suara dan sangat sosial. Suka berinteraksi dengan manusia.', 'image' => '🐦', 'featured' => false],
            ['id' => 8, 'name' => 'Lucky', 'type' => 'anjing', 'age' => '5 tahun', 'gender' => 'Jantan', 'description' => 'Lucky adalah anjing senior yang tenang dan penyayang. Suka tidur di pangkuan.', 'image' => '🐕', 'featured' => false],
        ];
    }
}
