## Basics first

- **Static friction.** A contact surface can oppose impending slip with whatever force is needed up to a maximum μₛN. Below this threshold the actual static friction can be smaller.
- **Kinetic friction.** A sliding surface is modelled with magnitude μₖN. Direction is opposite the relative sliding of the contacting surfaces.
- **Normal force.** N is a contact force perpendicular to the surface. A vertical pull or an incline can change it even when mass stays fixed.
- **Coefficients.** The μ values are ratios of forces and have no units. Use μₛ for impending slip and μₖ for sliding.

## Methods and when to use them

### Method A · Check the regime before calculating

If a block stays still, find the force needed to balance the applied force. Compare that force with μₛN. Substituting the maximum for an ordinary static case overstates the friction.

### Method B · Find normal force from perpendicular balance

On level ground with a pull upward and no vertical acceleration, N = mg − pull’s vertical component. Draw the vertical forces before using μₖN. For sliding acceleration, subtract friction along the motion and divide net force by mass.

### Method C · Resolve gravity on a slope

Use perpendicular weight component mg cos θ and downhill component mg sin θ. At the threshold of slipping, μₛmg cos θ = mg sin θ, so the minimum coefficient is tan θ.

## Question models and worked examples

### Static friction below the limit

**Question.** A block has normal force 100 N and μₛ=0.4. A horizontal 24 N push fails to move it. Find friction.

1. **Find the static-friction limit.** The maximum available static friction is μₛN = 0.4 × 100 = 40 N.\
   `0.4 × 100 = 40 N maximum`
2. **Find the force needed for equilibrium.** The block stays at rest, so friction balances the horizontal push. It needs to supply 24 N in the opposite direction.\
   `required static friction = 24 N`
3. **Check whether the surface can supply it.** The required 24 N is below the 40 N limit. Static friction therefore supplies exactly 24 N.\
   `24 ≤ 40 ⇒ actual friction = 24 N`

**Answer:** 24 N opposite the push.

### Sliding acceleration

**Question.** A 10 kg block slides on level ground, g=10 and μₖ=0.25. If pushed horizontally with 40 N in its direction of motion, what is the acceleration?

1. **Find the normal force.** On level ground with a horizontal push, weight is balanced vertically by the normal force. N = mg = 10 × 10 = 100 N.\
   `N = 10 × 10 = 100 N`
2. **Use sliding friction.** The block is already sliding, so fₖ = μₖN = 0.25 × 100 = 25 N, directed against its motion.\
   `fₖ = 0.25 × 100 = 25 N`
3. **Apply Newton’s second law.** The resultant in the motion direction is 40 − 25 = 15 N. Dividing by 10 kg gives 1.5 m/s².\
   `a = (40 − 25) ÷ 10 = 1.5 m/s²`

**Answer:** 1.5 m/s² in the direction of motion.

### Angled pull and normal force

**Question.** A 20 kg crate slides on level ground. An angled rope pulls upward with a 40 N vertical component. With g=10 and μₖ=0.3, find kinetic friction.

1. **Write the vertical balance.** Weight is 20 × 10 = 200 N downward. The rope already supplies 40 N upward, and the crate remains on level ground without vertical acceleration.\
   `N + 40 = 20 × 10`
2. **Find the remaining support.** The normal force supplies the rest, so N + 40 = 200 and N = 160 N.\
   `N = 200 − 40 = 160 N`
3. **Calculate sliding friction.** Use fₖ = 0.3 × 160 = 48 N. Its direction is opposite the sliding motion.\
   `fₖ = 0.3 × 160 = 48 N`

**Answer:** 48 N against sliding.

### Incline threshold

**Question.** A block sits on a 30° slope. What is the smallest μₛ that can hold it, with no other applied force?

1. **Resolve the weight.** On a 30° incline, the weight component down the slope is mg sin 30°, while the component pressing against it is mg cos 30°.\
   `downhill = mg sin 30°, normal = mg cos 30°`
2. **Set the threshold for holding.** At the smallest usable coefficient, available static friction equals the downhill component. Thus μₛmg cos 30° = mg sin 30°.\
   `μₛmg cos 30° ≥ mg sin 30°`
3. **Cancel the common factors.** μₛ = sin 30°/cos 30° = tan 30° = 1/√3, approximately 0.577.\
   `μₛ ≥ tan 30° = 1/√3`

**Answer:** 1/√3, about 0.577.

## Quick revision sheet

| When you see | Use this rule |
| --- | --- |
| Stationary contact | 0 ≤ fₛ ≤ μₛN and equilibrium determines the actual value. |
| Sliding contact | fₖ = μₖN. |
| Horizontal surface with upward pull | N = mg − Fvertical when vertical acceleration is zero. |
| Lowest μₛ on an incline with no other force | tan θ. |

## Exam tips

- **Compare with the limit.** Distinguish “fails to move” from “on the verge of moving.”
- **Avoid assuming N = mg.** Draw the perpendicular forces if the surface is tilted or a force has a vertical component.
- **State direction.** A friction answer can require its direction as well as its magnitude.
