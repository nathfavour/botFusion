#!/bin/bash
while true; do
  read -p "Enter text: " text
  curl -X POST -d "$text" http://localhost:3000/input
  while true; do
    response=$(curl -s http://localhost:3000/response)
    if [ "$response" ]; then
      echo "Response: $response"
      break
    fi
  done
done


##!/bin/bash
#while true; do
#  read -p "Enter text: " text
#  curl -X POST -d "$text" http://localhost:3000/input
#done
#
