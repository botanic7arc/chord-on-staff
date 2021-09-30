#!/bin/bash

grep 'name:' ChordList.tsx|sed -e 's/.*name: .//g'|sed -e 's/".*//g'|sed -e '1d'|sed -e 's/^/* /'|sed -e '1s/^/= 対応コード\n\n/'>../ChordList.adoc