from __future__ import division
import math

def part_array(parts):
    the_array = []
    for i in range(0,parts):
        the_array.append(part(i+1,parts))
    return the_array

def part(of,end):
    return '({0},{1})'.format(of,end)

def validate(text, size):
    for each in text:
        if sum(len(i) for i in each) > size:
            return False
    return True

def split_text(text,part_size):

    # check if any words exceed the part size and throw err
    if not reduce(lambda x,y: x and (len(y) < part_size),text.split(), True):
        raise NameError('There exists a word out of bounds.')
   
    # if the whole message is below the limit, then just return it
    if len(text) < part_size:
        print(text)
        return text

    # let's roughly estimate the number of parts initially
    min = int(math.ceil(len(text)/part_size))

    text_array = text.split()
    final_counter = 0
    while final_counter + 1 != min:
        counter = 1
        completed = []
        temp = []
        for i in range(0,len(text_array)):
            if (reduce(lambda x,y: x+len(y),temp + [text_array[i]],0) + len(part(counter,min))) < part_size:
                temp.append(text_array[i])
            else:
                completed.append(temp + [part(counter,min)])
                counter += 1
                temp = []
                if (reduce(lambda x,y: x+len(y),temp + [text_array[i]],0) + len(part(counter,min))) < part_size:
                    temp = [text_array[i]]
                else:
                    """
                     e.g. the message limit is 10 and we encounter the word 'yesterday'
                     len('yesterday (0,0)') > 10
                    """
                    raise NameError('The character limit is too low to partition the message')
        if temp:
            completed.append(temp + [part(counter,min)])
        final_counter = counter
        min += 1

    for each in completed:
        print ' '.join(each)

    #return ' '.join(reduce(lambda x,y: x + y,completed,[]))

if __name__ == "__main__":
    split_text("I really enjoy listening to music. How about you? What's your favorite song?", 20)
