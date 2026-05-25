import React from 'react'
import ComponentHead from '../ComponentHead'
import faviconlogo from "/favicon.png";
import { Card, CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const FreeKundliBanner = () => {

    const [kundliData, setKundliData] = React.useState({
        name: "",
        gender: "",
        day: "",
        month: "",
        year: "",
        hour: "",
        minute: "",
        second: "",
        birthplace: "",
    });


    const startYear = 1928
    const currentYear = new Date().getFullYear()

    const years = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => currentYear - i
    )


    return (
        <section>
            <div className="container">

                <ComponentHead className='mb-10'
                    heading="Get Your Free Kundli Report"
                    title="Unlock the secrets of your destiny with our comprehensive free Kundli report. Discover insights into your personality, career, relationships, and more."
                />

                <div className="w-full h-0.5 mb-10 bg-secondary">
                    <img src={faviconlogo} className='mx-auto h-13 -translate-y-[50%]' alt="" />
                </div>
                <p className='text-center clear-start text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam aspernatur nesciunt laboriosam dolor qui quasi quas quam molestiae beatae aut!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, ad? Aliquid ut quisquam incidunt vel voluptatibus, consequatur officiis minima aut, neque soluta ipsum enim, facilis commodi optio blanditiis voluptate veritatis.</p>


                <div className="grid lg:grid-cols-3 grid-cols-1 gap-6 mt-10">
                    <div className='lg:col-span-2'>
                        <Card>
                            <CardContent>
                                <form>
                                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                                        <div className='md:col-span-3'>
                                            <Label htmlFor="name" className={"mb-3 text-md"}>Name</Label>
                                            <Input type="text" value={kundliData.name} onChange={(e) => setKundliData({ ...kundliData, name: e.target.value })} id="name" placeholder="Enter your name" />
                                        </div>
                                        <div className='md:col-span-3'>
                                            <Label htmlFor="gender" className={"mb-3 text-md"}>Gender</Label>
                                            <Select value={kundliData.gender} onValueChange={(value) => setKundliData({ ...kundliData, gender: value })}>
                                                <SelectTrigger className={"w-full"}>
                                                    <SelectValue placeholder="Theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="male">Male</SelectItem>
                                                    <SelectItem value="female">Female</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className=''>
                                            <Label htmlFor="day" className={"mb-3 text-md"}>day</Label>
                                            <Select value={kundliData.day} onValueChange={(value) => setKundliData({ ...kundliData, day: value })}>
                                                <SelectTrigger className={"w-full"}>
                                                    <SelectValue placeholder="Theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[...Array(31).keys()].map((num) => (
                                                        <SelectItem value={num + 1}>{num + 1}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className=''>
                                            <Label htmlFor="month" className={"mb-3 text-md"}>month</Label>
                                            <Select value={kundliData.month} onValueChange={(value) => setKundliData({ ...kundliData, month: value })}>
                                                <SelectTrigger className={"w-full"}>
                                                    <SelectValue placeholder="Month" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[...Array(12).keys()].map((num) => (
                                                        <SelectItem value={num + 1}>{num + 1}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className=''>
                                            <Label htmlFor="year" className={"mb-3 text-md"}>year</Label>
                                            <Select value={kundliData.year} onValueChange={(value) => setKundliData({ ...kundliData, year: value })}>
                                                <SelectTrigger className={"w-full"}>
                                                    <SelectValue placeholder="Theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {

                                                        years.map((year) => (
                                                            <SelectItem value={year}>{year}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className=''>
                                            <Label htmlFor="hour" className={"mb-3 text-md"}>Hour</Label>
                                            <Select value={kundliData.hour} onValueChange={(value) => setKundliData({ ...kundliData, hour: value })}>
                                                <SelectTrigger className={"w-full"}>
                                                    <SelectValue placeholder="Theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                   {
                                                        [...Array(24).keys()].map((num) => (
                                                            <SelectItem value={num+1}>{num+1}</SelectItem>
                                                        ))
                                                   }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className=''>
                                            <Label htmlFor="minute" className={"mb-3 text-md"}>Minute</Label>
                                            <Select value={kundliData.minute} onValueChange={(value) => setKundliData({ ...kundliData, minute: value })}>
                                                <SelectTrigger className={"w-full"}>
                                                    <SelectValue placeholder="Theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                   {
                                                        [...Array(60).keys()].map((num) => (
                                                            <SelectItem value={num+1}>{num+1}</SelectItem>
                                                        ))  
                                                   }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className=''>
                                            <Label htmlFor="second" className={"mb-3 text-md"}>Second</Label>
                                            <Select value={kundliData.second} onValueChange={(value) => setKundliData({ ...kundliData, second: value })}>
                                                <SelectTrigger className={"w-full"}>
                                                    <SelectValue placeholder="Seconds" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        [...Array(60).keys()].map((num) => (
                                                            <SelectItem value={num+1}>{num+1}</SelectItem>
                                                        ))  
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className='md:col-span-3'>
                                            <Label htmlFor="birthplace" className={"mb-3 text-md"}>Birth Place</Label>
                                            <Input type="text" id="birthplace" value={kundliData.birthplace} onChange={(e) => setKundliData({ ...kundliData, birthplace: e.target.value })} placeholder="Enter your birth place" />
                                        </div>


                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>



            </div>
        </section>
    )
}

export default FreeKundliBanner
