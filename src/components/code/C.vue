<script>
export default {};
</script>

<template>
    <main>
        <span class="keyword">#include</span>
        <span class="punctuation">&lt;</span>
        <span class="identifier">stdio.h</span>
        <span class="punctuation">&gt;</span>
        <br />
        <br />
        <span class="keyword">int </span>
        <span class="identifier">main</span>
        <span class="punctuation">(){</span>
        <br />
        &emsp; <span class="keyword">char </span>
        <span class="identifier">hello</span>
        <span class="punctuation">[] </span>
        <span class="punctuation">= </span>
        <span class="literal">"1 + 1 = 11"</span>
        <span class="punctuation">;</span>
        <br />
        &emsp; <span class="keyword">printf</span>
        <span class="punctuation">(</span>
        <span class="literal">"%s"</span>
        <span class="punctuation">, </span>
        <span class="identifier">hello</span>
        <span class="punctuation">)</span>
        <span class="punctuation">;</span>
        <br />
        &emsp; <span class="keyword">return </span>
        <span class="literal">0</span>
        <span class="punctuation">;</span>
        <br />
        <span class="punctuation">}</span>
    </main>
</template>
