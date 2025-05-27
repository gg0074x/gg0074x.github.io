<script>
export default {};
</script>

<template>
    <main>
        <span class="keyword">section </span>
        <span class="identifier">.data</span>
        <br />
        &emsp; <span class="identifier">msg </span>
        <span class="keyword">db </span>
        <span class="literal">"Beep boop im a machine!"</span>
        <br />
        &emsp; <span class="identifier">count </span>
        <span class="keyword">equ </span>
        <span class="literal">$-msg</span>
        <br />
        <br />
        <span class="keyword">section </span>
        <span class="identifier">.text</span>
        <br />
        <span class="keyword">global </span>
        <span class="identifier">_start</span>
        <br />
        <br />
        &emsp; <span class="keyword">mov </span>
        <span class="identifier">rax</span>
        <span class="punctuation">, </span>
        <span class="literal">1</span>
        <br />
        &emsp; <span class="keyword">mov </span>
        <span class="identifier">rdi</span>
        <span class="punctuation">, </span>
        <span class="literal">1</span>
        <br />
        &emsp; <span class="keyword">mov </span>
        <span class="identifier">rsi</span>
        <span class="punctuation">, </span>
        <span class="identifier">msg</span>
        <br />
        &emsp; <span class="keyword">mov </span>
        <span class="identifier">rdx</span>
        <span class="punctuation">, </span>
        <span class="identifier">count</span>
        <br />
        &emsp; <span class="keyword">syscall</span>
        <br />
        <br />
        &emsp; <span class="keyword">mov </span>
        <span class="identifier">rax</span>
        <span class="punctuation">, </span>
        <span class="literal">60</span>
        <br />
        &emsp; <span class="keyword">mov </span>
        <span class="identifier">rdi</span>
        <span class="punctuation">, </span>
        <span class="literal">0</span>
        <br />
        &emsp; <span class="keyword">syscall</span>
        <br />
    </main>
</template>
