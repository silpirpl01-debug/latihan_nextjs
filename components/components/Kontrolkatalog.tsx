type Props = {
  cari: string;
  onCariChange: (nilai: string) => void;
  kategori: string;
  daftarKategori: string[];
  onKategoriChange: (nilai: string) => void;
  urut: string;
  onUrutChange: (nilai: string) => void;
  hanyaTersedia: boolean;
  onHanyaTersediaChange: (nilai: boolean) => void;
  hargaMaksimal: string;
  onHargaMaksimalChange: (nilai: string) => void;
};

export default function KontrolKatalog({
  cari,
  onCariChange,
  kategori,
  daftarKategori,
  onKategoriChange,
  urut,
  onUrutChange,
  hanyaTersedia,
  onHanyaTersediaChange,
  hargaMaksimal,
  onHargaMaksimalChange,
}: Props) {
  return (
    <>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={cari}
          onChange={(e) => onCariChange(e.target.value)}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2"
        />

        <select
          value={kategori}
          onChange={(e) => onKategoriChange(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>

        <select
          value={urut}
          onChange={(e) => onUrutChange(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          <option value="tanggal">Tanggal terdekat</option>
          <option value="murah">Harga termurah</option>
          <option value="mahal">Harga termahal</option>
          <option value="nama">Nama A-Z</option>
        </select>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hanyaTersedia}
            onChange={(e) =>
              onHanyaTersediaChange(e.target.checked)
            }
          />
          Hanya yang masih ada tiket
        </label>

        <label className="flex items-center gap-2 text-sm">
          Harga maksimal
          <input
            type="number"
            min="0"
            value={hargaMaksimal}
            onChange={(e) =>
              onHargaMaksimalChange(e.target.value)
            }
            placeholder="Tanpa batas"
            className="w-32 rounded border bg-white px-3 py-2"
          />
        </label>
      </div>
    </>
  );
}