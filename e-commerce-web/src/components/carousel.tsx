"use client"

import * as React from "react"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

export default function Component() {
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 5)
    }, 3000) // Switch every 3 seconds

    return () => clearInterval(intervalId)
  }, [api])

  useEffect(() => {
    api?.scrollTo(currentIndex)
  }, [api, currentIndex])

  return (
    <div className="w-[880px] h-[446px] border border-gray-300 overflow-hidden rounded-2xl">
      <Carousel setApi={setApi} className="w-full h-full">
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((number) => (
            <CarouselItem key={number}>
              <Card className="w-full h-full border-none shadow-none bg-transparent">
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <h1 className="text-6xl pt-40">{number}</h1>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}