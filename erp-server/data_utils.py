# Data processing script for vega sample files
import json
import os
from random import randint, shuffle
import csv
from dateutil.parser import parse
import matplotlib.pyplot as plt
from collections import Counter
import operator



# inspect variable type float
def isfloat(x):
    try:
        a = float(x)
    except ValueError:
        return False
    else:
        return True


# inspect variable type int
def isint(x):
    try:
        a = float(x)
        b = int(a)
    except ValueError:
        return False
    else:
        return a == b


def is_date(string):
    if isint(string) or isfloat(string):
        return False
    try:
        # print(string)
        parse(string)
        return True
    except ValueError:
        return False


def non_null_label(full_array, label_key):
    result_val = 0
    for row in full_array:
        if (row[label_key] is not None):
            result_val = row[label_key]
            return result_val
        else:
            result_val = 0
    return result_val


# Generate an array of field types for a given dataset
def generate_field_types(t_data):
    # print (t_data[0])
    data_labels = {"str": 0, "num": 0, "dt": 0}
    field_name_types = {}
    field_name_types_array = []
    for field_name in t_data[0]:
        current_label = non_null_label(t_data,
                                       field_name)  # t_data[0][field_name]
        # print("=====", current_label, field_name)
        if (is_date(current_label) and not (isint(current_label)) and not (isfloat(current_label))):
            replace_num_var = "dt" + str(data_labels["dt"])
            data_labels["dt"] = data_labels["dt"] + 1
            field_name_types[field_name] = replace_num_var
            field_name_types_array.append({field_name: replace_num_var})
        elif (isint(current_label) or isfloat(current_label)):
            replace_num_var = "num" + str(data_labels["num"])
            data_labels["num"] = data_labels["num"] + 1
            field_name_types[field_name] = replace_num_var
            field_name_types_array.append({field_name: replace_num_var})
        else:
            replace_str_var = "str" + str(data_labels["str"])
            data_labels["str"] = data_labels["str"] + 1
            field_name_types[field_name] = replace_str_var
            field_name_types_array.append({field_name: replace_str_var})
    # print(field_name_types_array)
    return list(reversed(field_name_types_array))


# Replace field names with normalized strings based on field type
# replace_direction true = forward norm ... from json to normalized
def replace_fieldnames(source_data, field_name_types, replace_direction):
    # for field_name in field_name_types:
    #     if (replace_direction):
    #         source_data = str(source_data).replace(
    #             str(field_name), field_name_types[field_name])
    #     else:
    #         source_data = str(source_data).replace(
    #             str(field_name_types[field_name]), field_name)
    # return source_data
    for field_name in field_name_types:
        # print(field_name)
        field = list(field_name.keys())[0]
        value = field_name[field]
        # print(field, value)

        if (replace_direction):
            source_data = str(source_data).replace(str(field), value)
        else:
            source_data = str(source_data).replace(str(value), field)
    return source_data


# Normalize source json data fieldnames before visualization prediction
def forward_norm(source_data, destination_file, f_names):

    source_data_first_sample = source_data[0]
    source_data_first_sample = replace_fieldnames(source_data_first_sample,
                                                  f_names, True)
    source_data_first_sample = source_data_first_sample.replace("'", '"')
    # print("************",  source_data_first_sample )

    try:
        source_data_first_sample = json.loads(source_data_first_sample)
    except JSONDecodeError as e:
        return False

    # Write normalized JSON to file for seq2seq model
    # print("Writing data to file:", source_data_first_sample)
    write_data_to_file(destination_file, source_data_first_sample)
    # with open(destination_file, 'w') as source_data_file:
    #     json.dump(source_data_first_sample, source_data_file)
    #     # source_data_file.write((json.dumps(source_data)))
    return True



# Normalize output data after prediction ... replace short values with actual field names
def backward_norm(decoded_string, f_names):
    return replace_fieldnames(decoded_string, f_names, False)

def write_data_to_file(destination_file, source_data_first_sample):
    # Write normalized JSON to file for seq2seq model
    # print("Writing data to file:", source_data_first_sample)
    with open(destination_file, 'w') as source_data_file:
        json.dump(source_data_first_sample, source_data_file)
        # source_data_file.write((json.dumps(source_data)))
