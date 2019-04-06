library(jsonlite)
library(rvest)
library(xml2)
library(tidyr)
library(dplyr)
library(purrr)

df <- read_html("https://raw.githubusercontent.com/sourcecred/research/master/sample-graphs/sourcecred_sourcecred.json") %>%
  html_node('body') %>%
  html_text() %>%
  fromJSON()

df_nodes <- map_df(df$nodes[[2]] , function(x) {
  if(length(x) == 4){
    node_type <- gsub("_$", "", paste0(x[1:3], collapse = "_"))
    final <- data.frame(node_type = node_type, stringsAsFactors = FALSE)
  } else {
    node_type <- gsub("_$", "", paste0(x[1:4], collapse = "_"))
    final <- data.frame(node_type = node_type, stringsAsFactors = FALSE)
  }
  
  return(final)
})

df_edges <- df$edges[[2]] %>%
  bind_cols() %>%
  group_by(row_number()) %>%
  mutate(edge_type = gsub("_$", "", paste0(gsub("[0-9]", "", address[1][[1]][1:4]), collapse = "_")),
         source_node = df_nodes$node_type[ srcIndex + 1 ],
         dest_node = df_nodes$node_type[ dstIndex + 1 ]) %>%
  ungroup()%>%
  select(edge_type, srcIndex, dstIndex, source_node, dest_node)

## count node types

## count edge types

## count node pairings (by edge type?)

## text analysis of nodes

## tesxt analysis of edges