#!/bin/bash

command="pnpm prettier --check ./modules.cjs --log-level silent"
# command="pnpm prettier --check ./rolldown.config.ts --log-level silent"

# Array to store the results
results=()

for i in {1..10}; do
    # Start the timer
    start_time=$(date +%s.%N)

    # Run the command
    eval "$command"

    # End the timer
    end_time=$(date +%s.%N)

    # Calculate the elapsed time
    elapsed_time=$(echo "$end_time - $start_time" | bc)

    # Collect the results
    results+=("$elapsed_time")
done

# Calculate the average time
total_time=0
for time in "${results[@]}"; do
    total_time=$(echo "$total_time + $time" | bc)
done
average_time=$(echo "$total_time / ${#results[@]}" | bc -l)

# Calculate the standard deviation
sum_squared_diff=0
for time in "${results[@]}"; do
    diff=$(echo "$time - $average_time" | bc)
    squared_diff=$(echo "$diff * $diff" | bc)
    sum_squared_diff=$(echo "$sum_squared_diff + $squared_diff" | bc)
done
variance=$(echo "$sum_squared_diff / ${#results[@]}" | bc -l)
std_dev=$(echo "sqrt($variance)" | bc -l)

# Print the results
echo "Results: ${results[@]}"
echo "Average time: $average_time seconds"
echo "Minimum time: $(printf "%.6f" $(printf "%s\n" "${results[@]}" | sort -n | head -n 1)) seconds"
echo "Maximum time: $(printf "%.6f" $(printf "%s\n" "${results[@]}" | sort -n | tail -n 1)) seconds"
echo "Standard deviation: $std_dev"
