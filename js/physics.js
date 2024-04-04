class Physics {
    /**
     * Check if two entities collide
     * 
     * @param {Entity} entity1 entity1
     * @param {Entity} entity2 entity2
     * @returns true/false
     */
    static areCollide(entity1, entity2) {
        try {
            var d = dist(entity1.pos.x, entity1.pos.y, entity2.pos.x, entity2.pos.y);
            return d < (entity1.radius + entity2.radius) / 2;
        } catch (error) {
            console.log(entity1);
            console.log(entity2);
            console.log(error);
            noLoop();
        }
        
    }
}