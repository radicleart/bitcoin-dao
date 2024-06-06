echo "----------------------------------------------"
echo "Starting clarinet devnet conntainers and network."
echo "The network can take several minutes to come up"
echo "----------------------------------------------"
echo "check port 3999 and pox-4 contract to be sure."
echo "----------------------------------------------"

nohup clarinet devnet start --no-dashboard &

