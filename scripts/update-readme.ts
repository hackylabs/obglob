#!/usr/bin/env ts-node

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { benchmarks } from './benchTable'

const readme = readFileSync(join(__dirname, 'templates', 'README.txt')).toString()

const output = readme.replace('<--BENCH-->', benchmarks)

writeFileSync(join(__dirname, '..', 'README.md'), output)
