# Task 1 - Event Detection
## Survys
### Paper 1.  Zero- and Few-Shot Event Detection via Prompt-Based Meta Learning
* Summary 
* Methodology
* General Architecture
* Datasets Used 
* Citation 
    ```
    Yue, Z., Zeng, H., Lan, M., Ji, H., & Wang, D. (2023). Zero- and Few-Shot Event Detection via Prompt-Based Meta Learning. Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), 7928–7943. https://doi.org/10.18653/v1/2023.acl-long.440

    ```
 
## Prompt Based Approaches
### Paper 1.  Zero- and Few-Shot Event Detection via Prompt-Based Meta Learning
* Summary 
* Methodology
* General Architecture
* Datasets Used 
* Citation 
    ```
    Yue, Z., Zeng, H., Lan, M., Ji, H., & Wang, D. (2023). Zero- and Few-Shot Event Detection via Prompt-Based Meta Learning. Proceedings of the 61st Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers), 7928–7943. https://doi.org/10.18653/v1/2023.acl-long.440

    ```
## Emmbedding + Online Clustering 
### **Paper 1.  Embed2Detect: Temporally Clustered Embedded Words for Event Detection in Social Media**
* Summary: 
```
the aim of the system described in this paper is, given a filtered data stream, identifying event occurred time windows in (near) real-time including the corresponding event-related words. Using the hyper-parameters, users are allowed to set the significance and update rate of interested events
```
* Abstrract :
``` txt
- Social media is becoming a primary medium to discuss what is happening around the world. 
- Apart from a few notable exceptions, most previous research on automated event detection have focused only on statistical and syntactical features in data and lacked the involvement of underlying semantics which are important for effective information retrieval from text since they represent the connections between words and their meanings. 
- In this paper, we propose a novel method termed Embed2Detect for event detection in social media by combining the characteristics in word embeddings and hierarchical agglomerative clustering. 
- The adoption of word embeddings gives Embed2Detect the capability to incorporate powerful semantical features into event detection and overcome a major limitation inherent in previous approaches.
- We experimented our method on two recent real social media data sets which represent the sports and political domain and also compared the results to several state-of-the-art methods. 
- The obtained results show that Embed2Detect is capable of effective and efficient event detection and it outperforms the recent event detection methods. 
- For the sports data set, Embed2Detect achieved 27% higher F-measure than the best-performed baseline.
- For the political data set, it was an increase of 29%.
```
* Methodology
```
The main novelty of this approach is the involvement of corpus oriented semantical features for event detection using self-learned word embeddings.
Further, the temporal variations between clusters and vocabularies are considered to identify events without relying on clusters directly.
The Embed2Detect system contains four main components:
    (1) stream chunker, 
    (2) word embedding learner, 
    (3) event window identifier,
    (4) event word extractor.
Self-learned word embeddings are used during event window identification and event word extraction phases.
In order to evaluate the performance of this approach, event mapper is used to map detected events with ground truth events during experiments.
```
* Datasets Used  
```
MUNLIV
```
* Citation 
    ```
        Hettiarachchi, Hansi, Mariam Adedoyin-Olowe, Jagdev Bhogal, and Mohamed Medhat Gaber. 2022. “Embed2Detect: Temporally Clustered Embedded Words for Event Detection in Social Media.” Machine Learning 111(1): 49–87. doi:10.1007/s10994-021-05988-7.

    ```

## Graph Neural Network Based Approaches 
### Paper 1.  Deep-Eware: Spatio-Temporal Social Event Detection Using a Hybrid Learning Model
* Summary 
* Methodology
* General Architecture
* Datasets Used 
* Citation 
    ```
    Afyouni, Imad, Aamir Khan, and Zaher Al Aghbari. 2022. “Deep-Eware: Spatio-Temporal Social Event Detection Using a Hybrid Learning Model.” Journal of Big Data 9(1): 86. doi:10.1186/s40537-022-00636-w.


    ```
### Paper 1.  Hierarchical and Incremental Structural Entropy Minimization for Unsupervised Social Event Detection
* Summary 
* Problem Formalisation

    Given a sequence of social messages $S_{streame} = m_1, ..., m_N$ as input,
    the task of social event detection can be fulfilled by constructing and partitioning a message graph $G = (V, E)$.

    The node set $V = {m_1, ..., m_N }$. 
    
    The edge set $E$ is initially empty and to be expanded by the message graph construction process. 
   
    Partitioning G results in $ \{e_1, ..., e_M\}, ei ⊂ V, ei ∩ ej = ∅$,
    which is a partition of V containing M clusters (sets) of messages that correspond to the M detected
social events.

* Methodology
* General Architecture
* Datasets Used 
* Citation 
    ```
    Cao, Yuwei, Hao Peng, Zhengtao Yu, and Philip S. Yu. 2023. “Hierarchical and Incremental Structural Entropy Minimization for Unsupervised Social Event Detection.” doi:10.48550/arXiv.2312.11891.

    ```
