# Questions by Role

Quick-reference topics to brush up on depending on the role you're interviewing for.

## Data Science <Badge type="info" text="reference" />

::: details View Answer
- **Train/test splits** — why we split (avoid overfitting); `train_test_split` with a fixed `random_state` for reproducibility.
- **Cross-validation** — k-fold CV gives more reliable performance estimates by training/validating across multiple splits.
- **Supervised vs unsupervised** — labeled data (classification, regression) vs finding patterns in unlabeled data (clustering, dimensionality reduction).
- **Handling missing data** — pandas `isna()`, `dropna()`, `fillna()`, and when each is appropriate.
- **Groupby aggregation** — `df.groupby()` for per-category summary statistics.
:::

## Data Analytics <Badge type="info" text="reference" />

::: details View Answer
- **DataFrame merging** — join types (inner/outer/left/right) via `pd.merge()` / `df.merge()`.
- **Descriptive statistics** — what `df.describe()` reports; interpret mean, median, quartiles.
- **Pivot tables** — reshape with `pd.pivot_table()` to summarize across dimensions.
- **Duplicate handling** — `df.drop_duplicates()` and controlling which rows to keep.
- **Group statistics** — `groupby()` with `mean`/`sum`/custom aggregations.
:::

## Software Engineering <Badge type="info" text="reference" />

::: details View Answer
- **Palindrome detection** — handle case and non-alphanumeric characters.
- **Nth largest element** — sorting vs linear-scan approaches.
- **Binary search** — O(log n) on sorted data by halving the interval.
- **Word frequency counting** — `collections.Counter` and `most_common()`.
- **Removing duplicates** — dedupe a list while preserving order (dict/set tricks).
:::