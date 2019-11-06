import getDecimals from "./src/util"

const base = (m=0, d=1) => (Math.sqrt(-2 * Math.log(Math.random())) * Math.cos(2 * Math.PI * Math.random())) * d + m

const normal = (m, d, decs=0) => {
    const mult = 10 ** decs
    return Math.round(base(m, d) * mult) / mult
}

const normChoose = (array, devs=3) => array[normRange(0, array.length - 1, 0, devs)]

const normRange = (from, to, decs=0, devs=3) => {
    const deviations = devs < 1 || typeof devs != "number" ? 3 : devs
    const mult = 10 ** getDecimals(decs, from, to)

    const result = Math.round(base((from+to)/2, (to-from)/(deviations*2)) * mult) / mult
    return result < from || result > to ? normRange(from, to, decs, devs) : result
}

module.exports = { normal, normChoose, normRange }