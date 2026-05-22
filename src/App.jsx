import { useState } from "react";

import {
  FaBatteryHalf,
  FaBolt,
  FaClock,
  FaHome,
  FaHistory,
  FaCog,
  FaCalculator,
} from "react-icons/fa";

const logo = "/logo.png";
const motor = "/motor.png";

export default function App() {

  /* =========================
     MENU
  ========================== */

  const [menu, setMenu] =
    useState("dashboard");

  /* =========================
     DATA
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

  // isi daya

  const isiKwh =
    kapasitasBattery *
    ((100 - sisaBattery) / 100);

  // charger × 84

  const totalCharger =
    kemampuanCharger * 84;

  // progress

  const progress =
    100 - sisaBattery;

  // estimasi jam

  const estimasiJam =
    isiKwh / totalCharger;

  // ke menit

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

        {/* ================= DASHBOARD ================= */}

        {menu === "dashboard" && (

          <>

            {/* HERO */}

            <div className="relative overflow-hidden rounded-[35px] mb-6 border border-zinc-800 bg-black">

              {/* STATUS */}

              <div className="absolute top-4 right-5 z-10 flex items-center gap-2">

                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />

                <span className="text-white text-sm md:text-base">
                  Sistem Online
                </span>

              </div>

              {/* HERO CONTENT */}

              <div className="relative h-[220px] md:h-[320px] overflow-hidden">

                {/* PUTIH */}

                <div className="absolute inset-0 bg-white" />

                {/* HIJAU */}

                <div className="absolute bottom-0 left-0 w-full h-[30%] bg-green-700" />

                {/* MERAH */}

                <div
                  className="absolute left-0 top-0 h-full w-[32%] bg-red-600"
                  style={{
                    clipPath:
                      "polygon(0 0, 100% 50%, 0 100%)"
                  }}
                />

                {/* OVERLAY */}

                <div className="absolute inset-0 bg-black/5" />

                {/* CONTENT */}

                <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-12">

                  {/* TEXT */}

                  <div>

                    <h1 className="text-5xl md:text-8xl font-black text-black leading-none">
                      PALESTINA
                    </h1>

                    <h2 className="text-4xl md:text-7xl font-black text-green-700 mt-2">
                      OSMIN
                    </h2>

                    <p className="text-black text-lg md:text-2xl font-semibold mt-4">
                      POWER • UNITY • FREEDOM
                    </p>

                  </div>

                  {/* MOTOR */}

                  <div className="hidden md:flex items-center justify-center">

                    <img
                      src={motor}
                      className="w-[340px] drop-shadow-[0_0_15px_black]"
                    />

                  </div>

                </div>

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

/* =========================
   CARD
========================== */

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

/* =========================
   INPUT
========================== */

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

/* =========================
   RESULT
========================== */

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

/* =========================
   SYS
========================== */

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