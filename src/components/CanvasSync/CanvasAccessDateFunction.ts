const getCanvasAccessDate = (canvasAccessDate: Date) => {
  const dateOfInterest = (canvasAccessDate.valueOf() ? canvasAccessDate : new Date())
  const offset = dateOfInterest.getTimezoneOffset() * 60 * 1000
  const setDate = new Date(dateOfInterest.valueOf() - offset)
  return setDate.toISOString().slice(0,16)
}

export default getCanvasAccessDate