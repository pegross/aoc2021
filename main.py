depths = []

with open('input/1') as f:
    for line in f:
        depths.append(int(line.strip()))

# a
deeper_a = 0
for idx, _ in enumerate(depths):
    if idx != 0 and depths[idx] > depths[idx - 1]:
        deeper_a += 1

# b
deeper_b = 0
for idx, _ in enumerate(depths):
    try:
        first = depths[idx] + depths[idx + 1] + depths[idx + 2]
        second = depths[idx + 1] + depths[idx + 2] + depths[idx + 3]
        if second > first:
            deeper_b += 1
    except IndexError:
        pass

print('a', deeper_a)
print('b', deeper_b)
