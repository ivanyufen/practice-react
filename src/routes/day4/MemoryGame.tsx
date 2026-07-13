interface MemoryGameProps {
  images: string[]
}

import {
  memo,
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
} from 'react'
import './MemoryGame.css'
import { flip, shuffle } from 'lodash'

const ImagePlay = memo(({ img, isFlipped, onClick }) => {
  const handleClick = () => {
    onClick(img.id)
  }

  return (
    <div className="image" onClick={handleClick}>
      {isFlipped ? (
        <img alt="img" src={img.url} loading="eager" />
      ) : (
        <div
          style={{
            backgroundColor: 'gray',
            width: '100%',
            height: '100%',
            borderRadius: 10,
          }}
        />
      )}
    </div>
  )
})

export default function MemoryGame({ images }: MemoryGameProps) {
  const [finalImages, setFinalImages] = useState(
    shuffle([...images, ...images]).map((img, index) => ({
      id: index,
      url: img,
    })),
  )

  const timer = useRef(null)
  const [tempVisibleID, setTempVisibleID] = useState([]) //max 2 length
  const [permanentImages, setPermanentImages] = useState([])

  const removeFirstItem = () => {
    setTempVisibleID((prev) => prev.slice(1))
  }

  useEffect(() => {
    // Nothing to do
    if (tempVisibleID.length === 0) return

    // If there are exactly 2 items and they're the same,
    // cancel any pending removal and clear everything.
    if (
      tempVisibleID.length === 2 &&
      finalImages[tempVisibleID[0]].url === finalImages[tempVisibleID[1]].url
    ) {
      clearTimeout(timer.current)
      setPermanentImages((prev) => [
        ...prev,
        tempVisibleID[0],
        tempVisibleID[1],
      ])

      setTempVisibleID([])
      return
    }

    // If there are 3 or more, remove the oldest immediately.
    if (tempVisibleID.length >= 3) {
      removeFirstItem()
      return
    }

    timer.current = setTimeout(() => {
      removeFirstItem()
    }, 1000)

    return () => clearTimeout(timer.current)
  }, [tempVisibleID])
  const handleFlip = (id) => {
    const tempTempVisibleID = [...tempVisibleID, id]
    setTempVisibleID([...tempTempVisibleID])
  }

  const refresh = () => {
    // temporaryActiveImage.current = null
    // setTempVisibleID([])
    // setPermanentVisibleImages([])
    // setFinalImages(
    //   shuffle([...images, ...images]).map((img, index) => ({
    //     id: index,
    //     url: img,
    //   })),
    // )
  }

  return (
    <>
      <head>
        {finalImages.map((img) => (
          <link
            rel="preload"
            fetchPriority="high"
            as="image"
            href={img.url}
            type="image/jpeg"
          />
        ))}
      </head>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          height: 'fit-content',
        }}
      >
        {finalImages.map((img, index) => {
          const isFlipped =
            tempVisibleID.includes(img.id) || permanentImages.includes(img.id)

          // const isPermanent = permanentVisibleImages.includes(img.id)
          return (
            <ImagePlay
              img={img}
              onClick={handleFlip}
              // onFlipBack={() => handleFlipBack(img.id)}
              isFlipped={isFlipped}
            />
          )
        })}
      </div>
      <button onClick={refresh}>New Game</button>
    </>
  )
}
