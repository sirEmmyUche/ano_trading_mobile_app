import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Pressable, StyleSheet,Button} from 'react-native';

interface QueryDataProps {
  apiFunction: (page: number) => Promise<any>;
  renderData: (data: any) => React.ReactNode; // Add renderData prop
}

const QueryData: React.FC<QueryDataProps> = ({ apiFunction, renderData }) => {
  const [page, setPage] = useState(0);
  const { isLoading, isError, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['signals', page],
    queryFn: () => apiFunction(page),
    placeholderData: keepPreviousData,
    refetchInterval: 600000, // Refetch every 10 minutes (600000 milliseconds)
  });

  if (isLoading) {
    return (
      <ThemedView style={[styles.serverResponse,]}>
        <ThemedText style={{textAlign:'center'}}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if(isError) {
    console.error("Error fetching past signals:", error);
    return (
      <ThemedView style={[styles.serverResponse,]}>
        <ThemedText style={{textAlign:'center'}}>
          Unable to display past trades. Please try again later.
        </ThemedText>
      </ThemedView>
    );
  }

  if(!data) {
    return (
      <ThemedView style={[styles.serverResponse,]}>
          <ThemedText style={{textAlign:'center'}}>
            No response from server. Please try again later.
          </ThemedText>
      </ThemedView>
    );
  }

  if (data.status === 'failed') {
    return (
      <ThemedView style={[styles.serverResponse,]}>
        <ThemedText style={{textAlign:'center'}}>{data.message}</ThemedText>
      </ThemedView>
  );
  }

  const hasSignals = data.status === 'success' && data.signals.length > 0;

  return (
    <ThemedView>
      {hasSignals ? (
        <>
          {renderData(data)}
          <ThemedView style={styles.paginationHolder}>
            <ThemedText>Current Page: {page + 1}</ThemedText>
            <ThemedView style={styles.buttonHolder}>
              <Button
                // style={styles.button}
                onPress={() => setPage((old) => Math.max(old - 1, 0))}
                disabled={page === 0}
                title="Previous"
              >
                {/* <ThemedText>Previous</ThemedText> */}
              </Button>
              <Button
                // style={styles.button}
                title="Next"
                onPress={() => {
                  if (!isPlaceholderData && data.hasMore) {
                    setPage((old) => old + 1);
                  }
                }}
                disabled={isPlaceholderData || !data?.hasMore}
              >
                {/* <ThemedText>Next</ThemedText> */}
              </Button>
            </ThemedView>
            <ThemedText>{isFetching ? 'Loading...' : null}</ThemedText>
          </ThemedView>
        </>
      ) : (
        <ThemedView style={[styles.serverResponse,]}>
        <ThemedText style={{textAlign:'center'}}>
          There was an issue fetching past signals. Please try again later.
        </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  serverResponse:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  paginationHolder: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonHolder: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

export default QueryData;
