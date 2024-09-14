#!/usr/bin/env ts-node

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { mainOptions } from './mainOptions'

const readme = readFileSync(join(__dirname, 'templates', 'README.txt')).toString()
const output = readme.replace('<--MAIN_OPTIONS-->', mainOptions)

writeFileSync(join(__dirname, '..', 'README.md'), output)
