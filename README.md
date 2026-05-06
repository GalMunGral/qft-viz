u# QFT Visualizer

**Live demo:** https://galmungral.github.io/qft-viz/

## Rhetorical Design

### Purpose

The quantum Fourier transform is typically the first obstacle in learning quantum computing, yet it underlies a large class of quantum algorithms — Shor's factoring algorithm, phase estimation, and the hidden subgroup problem all rely on the same intuition. The core insight is a duality: a periodic function has a sparse spectrum, and a sparse function has a periodic spectrum. The QFT is simply a change of basis that makes this duality explicit. Periodicity and sparsity are immediately recognizable as visual patterns — repeating structure and isolated peaks — yet the same ideas expressed symbolically can remain opaque for a long time. This project is aimed at programmers curious about quantum computing who have not studied Fourier analysis.

### Strategy

The visualization works constructively. Starting from a sparse selection of Fourier basis vectors — those at multiples of $Q/P$, highlighted in the left panel — the middle panel shows the corresponding Fourier coefficients being picked, and the right panel shows how those components combine, with the resulting state displayed simultaneously in both the standard basis and the Fourier basis. Adjusting the parameters changes which representation appears periodic and which appears sparse, making the duality directly observable in both directions. The $x_0$ parameter illustrates the shift theorem: a translation in the standard basis corresponds to a phase shift in the Fourier basis, leaving the sparsity pattern unchanged. The algebra is shown inline alongside each panel, so the viewer can follow the derivation and the picture simultaneously.