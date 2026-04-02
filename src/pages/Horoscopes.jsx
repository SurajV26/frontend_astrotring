import HeadWithLogo from '@/components/HeadWithLogo';
import HoroscopeBanner from '@/components/Horoscopes/HoroscopeBanner';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const Horoscopes = () => {
    const { date } = useParams();
    const { horoscope, loading } = useSelector((state) => state.horoscope);

    console.log("PATH", horoscope)
    console.log("date", date)

    const horoscopeData = horoscope ? horoscope.filter(h => h.type.toLowerCase() === date.toLowerCase()) : null;
    console.log("object",horoscopeData)


//     const horoscopeData = horoscope
//   ? horoscope.filter(h => h.zodiac?.name?.toLowerCase() === date.toLowerCase())
//   : null;
//     console.log("horoscopes data",horoscopeData)
    return (
        <>
            <HoroscopeBanner data={horoscopeData} title={`Horoscopes for ${date}`} />
        </>
    )
}

export default Horoscopes
