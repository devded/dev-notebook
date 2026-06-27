# Data Science & Machine Learning

> Add new questions below in the same format: `## Question? <Badge ... />` then the answer.

## What is data science and how is Python used in it? <Badge type="tip" text="easy" />

Data science extracts insight from data via statistics, programming, and domain knowledge. Python is the dominant tool thanks to its ecosystem: `pandas`/`NumPy` (wrangling), `matplotlib`/`seaborn` (viz), `scikit-learn` (ML), and notebooks (Jupyter).

## How do you clean and preprocess data? <Badge type="warning" text="medium" />

Handle missing values, fix types, remove duplicates, normalize/scale, and encode categoricals — mostly with pandas and scikit-learn.

```python
df = df.drop_duplicates()
df["age"] = df["age"].fillna(df["age"].median())
df["price"] = df["price"].astype(float)
```

## What is a DataFrame in pandas? <Badge type="tip" text="easy" />

A 2D labeled table with rows and named columns (each column a `Series`) — like a spreadsheet or SQL table in memory, supporting filtering, grouping, joining, and aggregation.

```python
import pandas as pd
df = pd.DataFrame({"name": ["A", "B"], "score": [90, 80]})
```

## How do you handle missing data with pandas? <Badge type="warning" text="medium" />

Detect with `isna()`, drop with `dropna()`, or fill with `fillna()` (constant, mean/median, forward/back fill) depending on context.

```python
df.isna().sum()                 # count per column
df = df.dropna(subset=["id"])   # drop rows missing id
df["x"] = df["x"].fillna(0)     # fill
```

## How do you perform data aggregation in pandas? <Badge type="warning" text="medium" />

`groupby()` plus an aggregation; or `agg()` for multiple/custom functions; `pivot_table()` for cross-tabs.

```python
df.groupby("region")["sales"].sum()
df.groupby("region").agg(total=("sales", "sum"), avg=("sales", "mean"))
```

## What is scikit-learn and how do you use it? <Badge type="warning" text="medium" />

A general-purpose ML library with a consistent `fit`/`predict` API for classification, regression, clustering, and preprocessing.

```python
from sklearn.linear_model import LogisticRegression
model = LogisticRegression()
model.fit(X_train, y_train)
preds = model.predict(X_test)
```

## How do you handle feature selection? <Badge type="warning" text="medium" />

Remove irrelevant/redundant features to improve accuracy and reduce overfitting: filter methods (correlation, `SelectKBest`), wrapper methods (RFE), or embedded methods (Lasso, tree feature importances).

```python
from sklearn.feature_selection import SelectKBest, f_classif
X_new = SelectKBest(f_classif, k=10).fit_transform(X, y)
```

## What is cross-validation and how do you perform it? <Badge type="warning" text="medium" />

Splitting data into k folds and training/validating across them for a more reliable performance estimate than a single split.

```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)
print(scores.mean())
```

## How do you save a trained model? <Badge type="tip" text="easy" />

Serialize it with `joblib` (efficient for NumPy-heavy models) or `pickle`; reload to predict without retraining.

```python
import joblib
joblib.dump(model, "model.pkl")
model = joblib.load("model.pkl")
```

## What are the steps to train a machine learning model? <Badge type="warning" text="medium" />

1) Collect & clean data, 2) split into train/test, 3) preprocess/engineer features, 4) pick a model, 5) train (`fit`), 6) evaluate (cross-validation, metrics), 7) tune hyperparameters, 8) save & deploy.

## What is Keras? <Badge type="tip" text="easy" />

A high-level deep-learning API (now part of TensorFlow) for building and training neural networks with minimal code via a simple, layer-based interface.

```python
from tensorflow import keras
model = keras.Sequential([
    keras.layers.Dense(64, activation="relu"),
    keras.layers.Dense(1),
])
model.compile(optimizer="adam", loss="mse")
```

## How does feature engineering work? <Badge type="warning" text="medium" />

Creating/transforming input features to help models learn: scaling/normalization, encoding categoricals, binning, combining columns, extracting date parts, and handling outliers. Good features often matter more than the model choice.

## What is clustering in ML? <Badge type="warning" text="medium" />

An **unsupervised** technique that groups similar data points without labels — e.g. K-Means, DBSCAN, hierarchical. Used for segmentation, anomaly detection, and exploration.

```python
from sklearn.cluster import KMeans
labels = KMeans(n_clusters=3).fit_predict(X)
```

## What are Jupyter Notebooks? <Badge type="tip" text="easy" />

Interactive documents mixing live code, output, visualizations, and markdown in cells — the standard tool for data exploration, prototyping, and sharing analyses.

## How does Python handle big data? <Badge type="warning" text="medium" />

Process in chunks (`pandas` `chunksize`), use out-of-core/parallel tools (Dask, PySpark, Polars), efficient formats (Parquet), and generators to stream rather than load everything into memory.

## What are the features of SciPy? <Badge type="tip" text="easy" />

Built on NumPy, SciPy adds scientific routines: optimization, integration, interpolation, linear algebra, signal/image processing, and statistics (`scipy.stats`).

## Explain linear regression with Python. <Badge type="warning" text="medium" />

Models a target as a linear combination of features by fitting coefficients that minimize squared error. Use scikit-learn's `LinearRegression`.

```python
from sklearn.linear_model import LinearRegression
model = LinearRegression().fit(X_train, y_train)
model.predict(X_test)
model.coef_, model.intercept_
```

## How do you evaluate ML models? <Badge type="warning" text="medium" />

Pick metrics for the task: classification — accuracy, precision/recall, F1, ROC-AUC; regression — MAE, MSE/RMSE, R². Validate with a held-out test set or cross-validation, and watch for over/underfitting.

```python
from sklearn.metrics import accuracy_score, mean_squared_error
accuracy_score(y_true, y_pred)
mean_squared_error(y_true, y_pred)
```
