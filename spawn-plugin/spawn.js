/**
 * Spawn Plugin
 *
 * Spawns a user's avatar on a random place in the space.
 * Listens for a hook called 'spawn' and moves the user's avatar to a random position .
 *
 * @license MIT
 * @author Zongo Maqutu @zmaqutu
 */

 module.exports = class SpawnPlugin extends BasePlugin {

        /** Plugin info */
        static get id()             { return 'spawn-plugin' }
        static get name()           { return 'Spawn Plugin' }
        static get description()    { return 'Spawns a user\'s avatar on a random place in the space.' }

        //list of all spawn discs in the space
        spawnObjectIDs = []
    
        /** Called when the plugin is loaded */
        onLoad() {
                // Register component
                this.objects.registerComponent(SpawnComponent, {
                        id: 'spawn',
                        name: 'Spawn Avatar',
                        description: 'Moves this object to a random position in the space.',
                })
                
                this.hooks.addHandler('fpshud.death', this.spawnToRandomPosition)
    
        }

        onUnload() {
                        
                // this.menus.alert('Goodbye World!')
        
        }

        onSettingsUpdated(field, value) {
    
                // this.menus.alert('Settings updated!')
    
        }

        spawnToRandomPosition = async () => { 
                console.log('spawn hook triggered')
                console.log(this.spawnObjectIDs)
                
                //get random spawn disc
                let randomObjectID = this.spawnObjectIDs[Math.floor(Math.random() * this.spawnObjectIDs.length)]
                
                // wait for the position of random spawn disc
                let objectProperties = await this.objects.get(randomObjectID)

                
                //move user to said position
                this.user.setPosition(objectProperties.x, objectProperties.height, objectProperties.z) 
        }
    
}
class SpawnComponent extends BaseComponent {

        /** Called when an object with this component is loaded */
        onLoad() {
            this.plugin.spawnObjectIDs.push(this.objectID)
    
        }
    
        /** Called when the user clicks on this object */
        onClick() {
            console.log(this.plugin)
    
        }

        /** Called when your component is about to be removed */
        onUnload() {
                        
                /** Unload component and remove object ID from plugin */
                console.log('component removed')
                this.plugin.spawnObjectIDs = this.plugin.spawnObjectIDs.filter(id => id !== this.objectID)
                console.log(this.plugin.spawnObjectIDs)
        
        }

        /** Called when an editable field inside the component has changed. */
        onObjectUpdated(newFields) {
                console.log('Object updated!')
    
        }
    
    }
    