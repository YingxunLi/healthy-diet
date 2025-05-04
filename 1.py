import pandas as pd

# 读取 CSV 文件
file_path = "/Users/liburang/Documents/SoSe2025/PE2/healthy diet/data/data.csv"
data = pd.read_csv(file_path)

# 计算每行 Cost 超过或小于 TagGNI 的百分比
data['Vergleich'] = data.apply(
    lambda row: (row['TagGNI'] / row['Cost']) * 100 if row['TagGNI'] >= row['Cost'] else -(row['TagGNI'] / row['Cost']) * 100,
    axis=1
)

# 保存修改后的数据回 CSV 文件
data.to_csv(file_path, index=False)

print("已成功更新 'Vergleich' 列为 Cost 超过或小于 TagGNI 的百分比，并保存到文件中。")