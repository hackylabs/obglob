import { join } from 'node:path'
import { writeFileSync } from 'node:fs'
import ChartJSImage from 'image-charts'
import benchmarkJson from '../benchmark.json'

interface BenchmarkInput {
  name: string,
  hz: number,
}

export const updateBenchChart = () => {
  const benchmarkData: BenchmarkInput[] = benchmarkJson
    .files[0]
    .groups[0]
    .benchmarks
  benchmarkData.sort((a, b) => b.hz - a.hz)

  const comparison = benchmarkData.map(({ name, hz }) => ({
    rate: hz / benchmarkData[0].hz,
    name: name
      .replace('Subject 1', `Subject 1\n(${Intl.NumberFormat().format(hz)})`)
      .replace('Subject 2', `Subject 2\n(${Intl.NumberFormat().format(hz)})`)
      .replace('Subject 3', `Subject 3\n(${Intl.NumberFormat().format(hz)})`),
  }))

  new ChartJSImage()
    .cht('bhs')
    .chco('F0F0F0|43B3AE45|F0F0F0')
    .chd(`t:${comparison.map(({ rate }) => rate).join(',')}`)
    .chl(comparison.map(({ name }) => name).join('|'))
    .chlps('align,right|anchor,start|offset,10|textAlign,left')
    .chtt('ops / sec')
    .chs('800x300')
    .toDataURI()
    .then(async (dataURI) => {
      const buffer = Buffer.from(dataURI.split(',')[1], 'base64')
      writeFileSync(join(__dirname, '..', 'benchmark.png'), buffer)
    })
}
