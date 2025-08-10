import { supabase } from "../supabase";

export const getRole = async (id: any) => {
    const { data, error } = await supabase.from('role').select("*").eq("user", id).single();

    return { data, error }
}

export const getProfile = async (id: any) => {
    const { data, error } = await supabase.from('profile').select("*").eq("user", id).single();

    return { data, error }
}
export const getLog = async (id: any, date: any) => {
    const { data, error } = await supabase.from('log_harian').select("*").eq("user", id).eq("tanggal", date);

    return { data, error }
}
export const getTamu = async () => {
    const { data, error } = await supabase.from('tamu').select("*")

    return { data, error }
}
export const getPotensi = async () => {
    const { data, error } = await supabase.from('potensi').select("*")

    return { data, error }
}
export const getLogs = async (id: any) => {
    const { data, error } = await supabase.from('log_harian').select("*").eq("user", id);

    return { data, error }
}
export const logout = async (cb: any) => {

    let { error } = await supabase.auth.signOut()

    if (error === null) {
        cb()
    }

    return true
}


export const getAbsenToday = async (id: any, date: any) => {
    const { data, error } = await supabase.from('absensi').select("*").eq("user", id).eq("tanggal", date).single();

    return { data, error }
}

export function formatDateComparable(dateInput: any) {
    const date = new Date(dateInput);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

type Coordinates = {
    latitude: number;
    longitude: number;
};

export function getCurrentLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            return reject(new Error("Geolocation is not supported by your browser."));
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(new Error(`Geolocation error: ${error.message}`));
            }
        );
    });
}

export function getCurrentTimeText(): string {
    const now = new Date();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

export function formatTanggalIndonesiaFromISO(isoString: any, onlyHours:any = false): string {

    
   const cleanedISOString = isoString?.replace(/\.(\d{3})\d*(?=\+|\Z)/, '.$1');

const date = new Date(cleanedISOString);
if (isNaN(date.getTime())) {
    return '-';
}

const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const namaHari = hari[date.getDay()];
const tanggal = date.getDate();
const namaBulan = bulan[date.getMonth()];
const tahun = date.getFullYear();

const jam = date.getHours().toString().padStart(2, '0');
const menit = date.getMinutes().toString().padStart(2, '0');

if(onlyHours){
    return `${jam}:${menit}`
}

return `${namaHari}, ${tanggal} ${namaBulan} ${tahun} ${jam}:${menit}`;

}

