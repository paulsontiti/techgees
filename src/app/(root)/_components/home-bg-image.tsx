import Image from "next/image"

const HomeBgImage = ()=>{

    return <div className="h-[50vh] relative object-cover opacity-35">
        <Image fill src="/assets/Homepage concept with search bar.png" alt="Background Image" className=""/>
    </div>
}

export default HomeBgImage