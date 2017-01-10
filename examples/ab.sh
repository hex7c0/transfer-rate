#!/bin/bash

clear

ab -c 8 -n 4000 127.0.0.1:3000/
