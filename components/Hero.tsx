import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <section className="bg-transparent text-black">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg lg:items-center">
                <div className="mx-auto max-w-3xl text-center p-10 bg-gray-600 rounded-3xl">
                    <h1
                        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Expense Tracker

                        <span className="sm:block pb-5"> Budget Better, Live Better </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        Track Every Penny, Save Every Money  – Master Your Budget and Control Your Future.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="block w-full rounded-full bg-black px-12 py-3 text-sm font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-0 active:text-opacity-75 sm:w-auto"
                            href="/dashboard"
                        >
                            Get Started
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Hero