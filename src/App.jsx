import { useState } from "react";

import {
  FaBatteryHalf,
  FaBolt,
  FaClock,
  FaHome,
  FaHistory,
  FaCog,
  FaCalculator,
  FaMotorcycle,
} from "react-icons/fa";

const logo = "/logo.png";

export default function App() {

  /* =========================
     MENU
  ========================== */

  const [menu, setMenu] =
    useState("dashboard");

  /* =========================
     DATA SISTEM
  ========================== */

  const kapasitasBattery = 3774;

  const ppn = 0.12;

  /* =========================
     STATE
  ========================== */

  const [sisaBattery, setSisaBattery] =
    useState(40);

  const [kemampuanCharger, setKemampuanCharger] =
    useState(10);

  /* =========================
     PERHITUNGAN
  ========================== */

  const isiKwh =
    kapasitasBattery *
    ((100 - sisaBattery) / 100);

  /*
    kemampuan charger × 84
  */

  const totalCharger =
    kemampuanCharger * 84;

  const progress =
    100 - sisaBattery;

  /*
    estimasi jam
  */

  const estimasiJam =
    isiKwh / totalCharger;

  /*
    konversi ke menit
  */

  const totalMenit =
    estimasiJam * 60;

  const jam =
    Math.floor(totalMenit / 60);

  const menit =
    Math.round(totalMenit % 60);

  let formatDurasi = "";

  if (jam <= 0) {

    formatDurasi =
      `${menit} Menit`;

  } else {

    formatDurasi =
      `${jam} Jam ${menit} Menit`;
  }

  /* =========================
     BIAYA
  ========================== */

  const biayaDasarSPKLU =
    (isiKwh / 1000) * 2466;

  const biayaSPKLU =
    biayaDasarSPKLU +
    (biayaDasarSPKLU * ppn);

  const biayaRumah =
    (isiKwh / 1000) * 1444.7;

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* ================= SIDEBAR ================= */}

      <div className="w-72 bg-[#050505] border-r border-zinc-800 p-4 hidden lg:flex flex-col justify-between">

        <div>

          {/* LOGO */}

          <div className="text-center mb-10">

            <img
              src={logo}
              className="w-44 mx-auto drop-shadow-[0_0_20px_green]"
            />

            <h1 className="text-5xl font-black mt-4">
              OSMIN
            </h1>

            <p className="text-green-500">
              SPKLU DASHBOARD
            </p>

          </div>

          {/* MENU */}

          <Menu
            icon={<FaHome />}
            text="Dashboard"
            active={menu === "dashboard"}
            onClick={() => setMenu("dashboard")}
          />

          <Menu
            icon={<FaCalculator />}
            text="Perhitungan"
            active={menu === "perhitungan"}
            onClick={() => setMenu("perhitungan")}
          />

          <Menu
            icon={<FaHistory />}
            text="Riwayat Charger"
            active={menu === "riwayat"}
            onClick={() => setMenu("riwayat")}
          />

          <Menu
            icon={<FaCog />}
            text="Pengaturan"
            active={menu === "pengaturan"}
            onClick={() => setMenu("pengaturan")}
          />

        </div>

        {/* FOOTER */}

        <div className="bg-zinc-900 rounded-3xl p-4 text-center border border-zinc-800">

          <img
            src={logo}
            className="w-24 mx-auto mb-3"
          />

          <h2 className="font-bold text-xl">
            PALESTINA OSMIN
          </h2>

          <p className="text-zinc-400 text-sm mt-2">
            Owner Community Motor Electric
          </p>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="flex-1 p-4 md:p-6">

        {menu === "dashboard" && (

          <>

            {/* HERO */}

            <div className="relative overflow-hidden rounded-[35px] mb-6 border border-zinc-800 bg-gradient-to-r from-red-600 via-white to-green-700">

              <div className="bg-black/40 p-8 md:p-10 flex items-center justify-between">

                <div>

                  <h1 className="text-5xl md:text-7xl font-black text-black">
                    PALESTINA
                  </h1>

                  <h2 className="text-4xl md:text-6xl font-black text-green-700">
                    OSMIN
                  </h2>

                  <p className="text-black font-bold mt-3">
                    POWER • UNITY • FREEDOM
                  </p>

                </div>

                <FaMotorcycle className="text-[180px] text-black hidden md:block" />

              </div>

            </div>

            {/* CARD */}

            <div className="grid md:grid-cols-4 gap-4 mb-6">

              <Card
                icon={<FaBatteryHalf />}
                title="SISA BATTERY"
                value={`${sisaBattery}%`}
              />

              <Card
                icon={<FaBolt />}
                title="ISI DAYA"
                value={`${isiKwh.toFixed(0)} Wh`}
              />

              <Card
                icon={<FaBolt />}
                title="TOTAL CHARGER"
                value={`${totalCharger.toFixed(0)} W`}
              />

              <Card
                icon={<FaClock />}
                title="ESTIMASI"
                value={formatDurasi}
              />

            </div>

            {/* GRID */}

            <div className="grid lg:grid-cols-2 gap-6">

              {/* INPUT */}

              <div className="bg-zinc-950 border border-zinc-800 rounded-[30px] p-6">

                <h2 className="text-3xl font-black mb-6">
                  INPUT DATA
                </h2>

                <Input
                  label="Sisa Battery (%)"
                  value={sisaBattery}
                  setValue={setSisaBattery}
                />

                <Input
                  label="Kemampuan Charger (Ampere)"
                  value={kemampuanCharger}
                  setValue={setKemampuanCharger}
                />

              </div>

              {/* RESULT */}

              <div className="bg-zinc-950 border border-zinc-800 rounded-[30px] p-6">

                <h2 className="text-3xl font-black mb-6">
                  HASIL PERHITUNGAN
                </h2>

                <Result
                  label="Isi Battery"
                  value={`${isiKwh.toFixed(0)} Wh`}
                />

                <Result
                  label="Kemampuan Charger"
                  value={`${kemampuanCharger} A`}
                />

                <Result
                  label="Total Charger"
                  value={`${totalCharger.toFixed(0)} Watt`}
                />

                <Result
                  label="Estimasi Durasi"
                  value={formatDurasi}
                />

                <Result
                  label="Biaya SPKLU + PPN"
                  value={`Rp ${biayaSPKLU.toFixed(0)}`}
                  red
                />

                <Result
                  label="Biaya Rumah"
                  value={`Rp ${biayaRumah.toFixed(0)}`}
                />

              </div>

            </div>

            {/* BOTTOM */}

            <div className="grid lg:grid-cols-2 gap-6 mt-6">

              {/* PROGRESS */}

              <div className="bg-zinc-950 border border-zinc-800 rounded-[30px] p-6">

                <h2 className="text-3xl font-black mb-6">
                  PROGRESS CHARGING
                </h2>

                <div className="w-full bg-zinc-800 rounded-full h-7 overflow-hidden">

                  <div
                    className="bg-green-500 h-7 transition-all duration-500"
                    style={{
                      width: `${progress}%`
                    }}
                  />

                </div>

                <div className="text-center mt-10">

                  <h1 className="text-7xl font-black text-green-500">
                    {progress}%
                  </h1>

                  <p className="text-zinc-400 text-xl mt-2">
                    Sedang Mengisi
                  </p>

                </div>

              </div>

              {/* SISTEM */}

              <div className="bg-zinc-950 border border-zinc-800 rounded-[30px] p-6">

                <h2 className="text-3xl font-black mb-6">
                  INFORMASI SISTEM
                </h2>

                <Sys
                  label="Kapasitas Battery"
                  value="3774 Wh"
                />

                <Sys
                  label="Tegangan Sistem"
                  value="72V"
                />

                <Sys
                  label="Konversi Charger"
                  value="Ampere × 84"
                />

                <Sys
                  label="Status"
                  value="Aktif"
                  green
                />

              </div>

            </div>

          </>

        )}

        {/* ================= PERHITUNGAN ================= */}

        {menu === "perhitungan" && (

          <div className="bg-zinc-950 border border-zinc-800 rounded-[30px] p-6">

            <h1 className="text-4xl font-black mb-6">
              FORM PERHITUNGAN
            </h1>

            <div className="grid md:grid-cols-2 gap-5">

              <InputDummy
                label="Kapasitas Battery"
                value="3774"
              />

              <InputDummy
                label="Tegangan"
                value="72"
              />

              <InputDummy
                label="Ampere Charger"
                value="10"
              />

              <InputDummy
                label="Konversi Charger"
                value="84"
              />

            </div>

            <button className="mt-6 bg-green-600 hover:bg-green-700 transition px-8 py-4 rounded-2xl font-bold">

              Simpan Perhitungan

            </button>

          </div>

        )}

        {/* ================= RIWAYAT ================= */}

        {menu === "riwayat" && (

          <div className="bg-zinc-950 border border-zinc-800 rounded-[30px] p-6">

            <h1 className="text-4xl font-black mb-6">
              RIWAYAT CHARGER
            </h1>

            <div className="space-y-4">

              <RiwayatCard
                tanggal="20 Mei 2026"
                charger="10A"
                durasi="4 Jam 27 Menit"
                biaya="Rp 10.400"
              />

              <RiwayatCard
                tanggal="19 Mei 2026"
                charger="8A"
                durasi="5 Jam 10 Menit"
                biaya="Rp 9.800"
              />

            </div>

          </div>

        )}

        {/* ================= PENGATURAN ================= */}

        {menu === "pengaturan" && (

          <div className="bg-zinc-950 border border-zinc-800 rounded-[30px] p-6">

            <h1 className="text-4xl font-black mb-6">
              PENGATURAN CASAN
            </h1>

            <div className="space-y-5">

              <InputDummy
                label="Nama Charger"
                value="Fast Charging 72V"
              />

              <InputDummy
                label="Tegangan Default"
                value="84"
              />

              <InputDummy
                label="Tarif SPKLU"
                value="2466"
              />

              <InputDummy
                label="PPN"
                value="12%"
              />

            </div>

            <button className="mt-6 bg-green-600 hover:bg-green-700 transition px-8 py-4 rounded-2xl font-bold">

              Simpan Pengaturan

            </button>

          </div>

        )}

      </div>

    </div>
  );
}

/* =========================
   MENU
========================== */

function Menu({
  icon,
  text,
  active,
  onClick,
}) {

  return (

    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-2xl mb-3 cursor-pointer transition ${
        active
          ? "bg-green-600 text-white"
          : "hover:bg-zinc-900 text-zinc-300"
      }`}
    >

      <div className="text-xl">
        {icon}
      </div>

      <span className="font-semibold">
        {text}
      </span>

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}) {

  return (

    <div className="bg-zinc-950 border border-zinc-800 rounded-[30px] p-6">

      <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-3xl mb-5">
        {icon}
      </div>

      <p className="text-zinc-400">
        {title}
      </p>

      <h1 className="text-4xl font-black mt-3 text-green-500">
        {value}
      </h1>

    </div>
  );
}

function Input({
  label,
  value,
  setValue,
}) {

  return (

    <div className="mb-5">

      <label className="block mb-3 text-zinc-400">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e)=>
          setValue(Number(e.target.value))
        }
        className="w-full bg-black border border-zinc-700 rounded-2xl p-4 text-xl"
      />

    </div>
  );
}

function Result({
  label,
  value,
  red,
}) {

  return (

    <div className="flex justify-between py-5 border-b border-zinc-800">

      <span className="text-zinc-300">
        {label}
      </span>

      <span className={`font-black text-2xl ${
        red
          ? "text-red-500"
          : "text-green-500"
      }`}>
        {value}
      </span>

    </div>
  );
}

function Sys({
  label,
  value,
  green,
}) {

  return (

    <div className="flex justify-between py-5 border-b border-zinc-800">

      <span className="text-zinc-300">
        {label}
      </span>

      <span className={`font-bold ${
        green
          ? "text-green-500"
          : "text-white"
      }`}>
        {value}
      </span>

    </div>
  );
}

function InputDummy({
  label,
  value,
}) {

  return (

    <div>

      <label className="block mb-3 text-zinc-400">
        {label}
      </label>

      <input
        defaultValue={value}
        className="w-full bg-black border border-zinc-700 rounded-2xl p-4"
      />

    </div>
  );
}

function RiwayatCard({
  tanggal,
  charger,
  durasi,
  biaya,
}) {

  return (

    <div className="bg-black border border-zinc-800 rounded-2xl p-5">

      <div className="flex justify-between mb-3">

        <h2 className="font-bold text-xl">
          {tanggal}
        </h2>

        <span className="text-green-500 font-bold">
          {charger}
        </span>

      </div>

      <p className="text-zinc-400">
        Durasi:
        {" "}
        {durasi}
      </p>

      <p className="text-zinc-400">
        Biaya:
        {" "}
        {biaya}
      </p>

    </div>
  );
}