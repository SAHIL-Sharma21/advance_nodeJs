#!/bin/bash
target=${1:-http://localhost:3000}
while true #loop forever, until ctrl+C pressed 
do
    # body
    for i in $(seq 100) #perform the innder cmd 100 times
    do
        curl $target > /dev/null & # send out the curl request,
    done

    wait #after 100 requests are sent out, wait for their process to finish.
done
